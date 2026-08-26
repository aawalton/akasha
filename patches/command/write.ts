export const summary = "Write whole files as a patch, gated before anything lands"

import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { CHECKS } from "../../checks/checks.ts"
import { runGate } from "../../checks/runner/gate.ts"
import { fail } from "../../../instructions/tools/lib/command.ts"
import { filePathPairs, repoOf } from "../../../instructions/tools/lib/payload.ts"
import { resolveRoots, targetRoot } from "../../../instructions/tools/lib/roots.ts"
import { forwardRunner } from "../../../instructions/tools/ops/tool-forward.ts"
import type { CommandHelp } from "../../../instructions/tools/ops/surface.ts"

const AKASHA = "akasha"

const SCRATCH = "/var/tmp"

const BUFFER_CEILING = 64 * 1024 * 1024

const DEFAULT_MODE = "100644"

const PATCH_FILE = "--patch-file"

const VALUE_FLAGS = [
  "--repo",
  "--input-file",
  "--file-path",
  "--content-file",
  "--message",
  "--message-file",
  "--remove",
  PATCH_FILE,
]

interface Landing {
  readonly relPath: string
  readonly from: string
}

function git(root: string, index: string | null, args: readonly string[]): Buffer {
  return execFileSync("git", ["-C", root, ...args], {
    maxBuffer: BUFFER_CEILING,
    env: index === null ? process.env : { ...process.env, GIT_INDEX_FILE: index },
  })
}

function valueOf(argv: readonly string[], name: string): string | null {
  const at = argv.indexOf(name)
  if (at === -1) return null
  const value = argv[at + 1]
  if (value === undefined) fail(`${name} needs a value`)
  return value
}

function without(argv: readonly string[], name: string): readonly string[] {
  const kept: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === name) {
      at += 1
      continue
    }
    kept.push(argv[at] as string)
  }
  return kept
}

function removalsIn(argv: readonly string[], root: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] !== "--remove") continue
    const value = argv[at + 1]
    if (value === undefined || value.startsWith("-")) fail("--remove needs a path")
    at += 1
    found.push(relative(root, value as string))
  }
  return found
}

function relative(root: string, pathish: string): string {
  const absolute = resolve(process.cwd(), pathish)
  if (absolute === root || !absolute.startsWith(`${root}/`)) {
    fail(`${pathish} is not inside ${root}, so nothing says where it would land`)
  }
  return absolute.slice(root.length + 1)
}

function landingsIn(argv: readonly string[], root: string): readonly Landing[] {
  const pairs = filePathPairs(argv, VALUE_FLAGS)
  if ("refusal" in pairs) fail(pairs.refusal)
  if (pairs.some((one) => one.contentFile === "-")) {
    fail(
      "a --content-file reads `-`, and a patch is built by reading every body twice — once into " +
        "the patch and once by the write that lands it. Put the body in a file of its own."
    )
  }
  if (pairs.length === 0) {
    fail(
      "this call addresses akasha and names no --file-path, so there is no body to build a patch " +
        "from. Hand each body in as --file-path <path> --content-file <file>."
    )
  }
  return pairs.map((one) => ({
    relPath: relative(root, one.filePath),
    from: resolve(process.cwd(), one.contentFile),
  }))
}

function modeOf(root: string, index: string, relPath: string): string {
  const staged = git(root, index, ["ls-files", "--stage", "--", relPath]).toString("utf8").trim()
  const mode = staged.split(/\s+/)[0]
  return mode === undefined || mode === "" ? DEFAULT_MODE : mode
}

function patchText(root: string, landings: readonly Landing[], removals: readonly string[]): string {
  const index = `${mkdtempSync(`${SCRATCH}/mp-write-`)}.index`
  try {
    git(root, index, ["read-tree", "HEAD"])
    for (const one of landings) {
      const sha = git(root, index, ["hash-object", "-w", "--path", one.relPath, one.from])
        .toString("utf8")
        .trim()
      const mode = modeOf(root, index, one.relPath)
      git(root, index, ["update-index", "--add", "--cacheinfo", `${mode},${sha},${one.relPath}`])
    }
    for (const relPath of removals) {
      git(root, index, ["update-index", "--force-remove", relPath])
    }
    return git(root, index, ["diff", "--cached", "--binary", "HEAD"]).toString("utf8")
  } finally {
    rmSync(index, { force: true })
  }
}

function refusalsOver(root: string, patch: string): readonly string[] {
  const held = mkdtempSync(`${SCRATCH}/mp-gate-`)
  const file = `${held}/change.patch`
  try {
    writeFileSync(file, patch)
    const said: string[] = []
    for (const outcome of runGate(CHECKS, { root, file })) {
      if ("threw" in outcome) {
        said.push(`${outcome.slug} threw: ${outcome.threw}`)
        continue
      }
      for (const failure of outcome.failures) {
        said.push(`${outcome.slug}: ${failure.path} — ${failure.reason}`)
      }
    }
    return said
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

async function forward(argv: readonly string[]): Promise<void> {
  await forwardRunner("write", null)(argv)
}

export const help: CommandHelp = {
  description:
    `${summary}.\n` +
    "\n" +
    "A call addressing akasha is turned into a patch against HEAD, the checks akasha defines " +
    "are run over the files that patch changes, and only then is it handed on to be gated and " +
    "landed. A call addressing any other repository is forwarded unchanged, those repositories " +
    "having nothing to patch for.\n" +
    "\n" +
    "Every flag but --patch-file belongs to `tools/write.ts` and is named in the help below, " +
    "which is that tool's own.",
  irreversible: "irreversible",
  flags: [
    {
      name: PATCH_FILE,
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "Write the patch here and stop: nothing is checked, nothing is landed. This is how a " +
        "patch is assembled over more than one call.",
    },
  ],
  positionals: [
    { name: "args", required: false, variadic: true, description: "Forwarded to `tools/write.ts`." },
  ],
  epilog: () => "",
}

export default async function write(argv: readonly string[]): Promise<void> {
  if (repoOf(argv) !== AKASHA) {
    if (valueOf(argv, PATCH_FILE) !== null) {
      fail(`${PATCH_FILE} is for a call addressing akasha; nothing outside it is landed by patch`)
    }
    await forward(argv)
    return
  }

  const root = targetRoot(resolveRoots(AKASHA))
  const landings = landingsIn(argv, root)
  const patch = patchText(root, landings, removalsIn(argv, root))

  const held = valueOf(argv, PATCH_FILE)
  if (held !== null) {
    writeFileSync(resolve(process.cwd(), held), patch)
    process.stderr.write(`patch: ${patch.length} byte(s) over ${landings.length} file(s) — nothing was checked or landed\n`)
    return
  }

  const refused = refusalsOver(root, patch)
  if (refused.length > 0) {
    process.stderr.write(`${refused.join("\n")}\nnothing was written\n`)
    process.exit(1)
  }
  process.stderr.write(`gate: ${CHECKS.length} akasha check(s) over ${landings.length} changed file(s), none refused\n`)
  await forward(argv)
}
