export const summary = "Write whole files as a patch, gated before anything lands"

import { execFileSync, spawn } from "node:child_process"
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { writerId } from "../../checks/act.ts"
import { CHECKS } from "../../checks/checks.ts"
import { applying, runGate } from "../../checks/run/gate.ts"

const HERE = realpathSync(resolve(import.meta.dir, "../.."))

const INSTRUCTIONS = process.env.INSTRUCTIONS_ROOT ?? resolve(HERE, "..", "instructions")

const WRITE_TOOL = `${INSTRUCTIONS}/tools/write.ts`

const SCRATCH = "/var/tmp"

const BUFFER_CEILING = 64 * 1024 * 1024

const DEFAULT_MODE = "100644"

const FILE_PATH = "--file-path"

const CONTENT_FILE = "--content-file"

const PATCH_FILE = "--patch-file"

const MECHANICAL = "--mechanical"

const VALUE_FLAGS = [
  "--repo",
  "--input-file",
  FILE_PATH,
  CONTENT_FILE,
  "--message",
  "--message-file",
  "--remove",
  PATCH_FILE,
]

interface Pair {
  readonly filePath: string
  readonly contentFile: string
}

interface Landing {
  readonly relPath: string
  readonly from: string
}

function fail(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(1)
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

function pairsIn(argv: readonly string[]): readonly Pair[] {
  const pairs: Pair[] = []
  let open: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === FILE_PATH) {
      if (open !== null) {
        fail(`${FILE_PATH} ${open} is given no ${CONTENT_FILE} before the next ${FILE_PATH}`)
      }
      const value = argv[at + 1]
      if (value === undefined) fail(`${FILE_PATH} needs a value`)
      open = value
      at += 1
      continue
    }
    if (token === CONTENT_FILE) {
      const value = argv[at + 1]
      if (value === undefined) fail(`${CONTENT_FILE} needs a value`)
      if (open === null) fail(`${CONTENT_FILE} ${value} follows no ${FILE_PATH}`)
      pairs.push({ filePath: open, contentFile: value })
      open = null
      at += 1
      continue
    }
    if (token !== undefined && VALUE_FLAGS.includes(token)) at += 1
  }
  if (open !== null) fail(`${FILE_PATH} needs ${CONTENT_FILE}`)
  return pairs
}

interface Carried {
  readonly filePath: string
  readonly content: string
}

function carriedIn(text: string): readonly Carried[] {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return []
  }
  const many = Array.isArray(read) ? read : [read]
  const found: Carried[] = []
  for (const one of many) {
    if (typeof one !== "object" || one === null) continue
    const held = one as Record<string, unknown>
    const filePath = held["file_path"]
    const content = held["content"]
    if (typeof filePath !== "string" || typeof content !== "string") continue
    found.push({ filePath, content })
  }
  return found
}

function payloadText(argv: readonly string[], wanted: boolean): string | null {
  const named = valueOf(argv, "--input-file")
  if (named !== null) {
    try {
      return readFileSync(resolve(process.cwd(), named), "utf8")
    } catch {
      return null
    }
  }
  if (!wanted) return null
  if (process.stdin.isTTY === true) return null
  try {
    const read = readFileSync(0, "utf8")
    return read === "" ? null : read
  } catch {
    return null
  }
}

function pairsOver(carried: readonly Carried[]): readonly Pair[] {
  const pairs: Pair[] = []
  for (const one of carried) {
    if (inside(one.filePath) === null) continue
    const at = `${mkdtempSync(`${SCRATCH}/mp-body-`)}/body`
    writeFileSync(at, one.content)
    pairs.push({ filePath: one.filePath, contentFile: at })
  }
  return pairs
}

function inside(pathish: string): string | null {
  const absolute = resolve(process.cwd(), pathish)
  return absolute.startsWith(`${HERE}/`) ? absolute.slice(HERE.length + 1) : null
}

function mustBeInside(pathish: string): string {
  const relPath = inside(pathish)
  if (relPath === null) fail(`${pathish} is not inside ${HERE}, so nothing says where it would land`)
  return relPath
}

function removalsNamed(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] !== "--remove") continue
    const value = argv[at + 1]
    if (value === undefined || value.startsWith("-")) fail("--remove needs a path")
    at += 1
    found.push(value)
  }
  return found
}

function removalsIn(argv: readonly string[]): readonly string[] {
  return removalsNamed(argv).map(mustBeInside)
}

function landingsIn(pairs: readonly Pair[], removals: readonly string[]): readonly Landing[] {
  if (pairs.some((one) => one.contentFile === "-")) {
    fail(
      `a ${CONTENT_FILE} reads \`-\`, and a patch is built by reading every body twice — once into ` +
        "the patch and once by the write that lands it. Put the body in a file of its own."
    )
  }
  if (pairs.length === 0 && removals.length === 0) {
    fail(
      `this call addresses akasha and names no ${FILE_PATH}, so there is no body to build a patch ` +
        `from. Hand each body in as ${FILE_PATH} <path> ${CONTENT_FILE} <file>.`
    )
  }
  return pairs.map((one) => ({
    relPath: mustBeInside(one.filePath),
    from: resolve(process.cwd(), one.contentFile),
  }))
}

function modeOf(index: string, relPath: string): string {
  const staged = git(HERE, index, ["ls-files", "--stage", "--", relPath]).toString("utf8").trim()
  const mode = staged.split(/\s+/)[0]
  return mode === undefined || mode === "" ? DEFAULT_MODE : mode
}

function patchText(landings: readonly Landing[], removals: readonly string[]): string {
  const index = `${mkdtempSync(`${SCRATCH}/mp-write-`)}.index`
  try {
    git(HERE, index, ["read-tree", "HEAD"])
    for (const one of landings) {
      const sha = git(HERE, index, ["hash-object", "-w", "--path", one.relPath, one.from])
        .toString("utf8")
        .trim()
      const mode = modeOf(index, one.relPath)
      git(HERE, index, ["update-index", "--add", "--cacheinfo", `${mode},${sha},${one.relPath}`])
    }
    for (const relPath of removals) {
      git(HERE, index, ["update-index", "--force-remove", relPath])
    }
    return git(HERE, index, ["diff", "--cached", "--binary", "HEAD"]).toString("utf8")
  } finally {
    rmSync(index, { force: true })
  }
}

function refusalsOver(patch: string, mechanical: boolean): readonly string[] {
  const held = mkdtempSync(`${SCRATCH}/mp-gate-`)
  const file = `${held}/change.patch`
  try {
    writeFileSync(file, patch)
    const said: string[] = []
    const asked = { root: HERE, file, writer: writerId(), mechanical }
    for (const ran of runGate(CHECKS, asked)) {
      if ("threw" in ran) {
        said.push(`${ran.slug} threw: ${ran.threw}`)
        continue
      }
      for (const failure of ran.failures) said.push(`${ran.slug}: ${failure.path} — ${failure.reason}`)
    }
    return said
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

function runWriteTool(argv: readonly string[], catching: boolean): Promise<string> {
  return new Promise<string>((resolve_, reject) => {
    const child = spawn(process.execPath, [WRITE_TOOL, ...argv], {
      stdio: catching ? ["ignore", "pipe", "pipe"] : "inherit",
      env: { ...process.env, INSTRUCTIONS_ROOT: INSTRUCTIONS },
    })
    let out = ""
    child.stdout?.on("data", (chunk: Buffer) => {
      out += chunk.toString()
    })
    child.on("error", () => reject(new Error(`${WRITE_TOOL} could not be run`)))
    child.on("close", (code) => {
      if (!catching && code !== 0) process.exitCode = code ?? 0
      resolve_(out.trim())
    })
  })
}

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "A call addressing akasha is turned into a patch against HEAD, the checks akasha defines " +
    "are run over the files that patch changes, and only then is it handed on to be gated and " +
    "landed. A call addressing any other repository is forwarded unchanged, those repositories " +
    "having nothing to patch for.\n" +
    "\n" +
    `Every flag but ${PATCH_FILE} belongs to \`tools/write.ts\` and is named in the help below, ` +
    "which is that tool's own.",
  flags: [
    {
      name: PATCH_FILE,
      argLabel: "<path>",
      valueShape: "token" as const,
      path: true,
      description:
        "Write the patch here and stop: nothing is checked, nothing is landed. This is how a " +
        "patch is assembled over more than one call.",
    },
  ],
  positionals: [
    { name: "args", required: false, variadic: true, description: "Forwarded to `tools/write.ts`." },
  ],
  epilog: () => runWriteTool(["--help"], true),
}

export default async function write(argv: readonly string[]): Promise<void> {
  const named = pairsIn(argv)
  const wanted = named.length === 0 && removalsNamed(argv).length === 0
  const text = argv.includes("--help") ? null : payloadText(argv, wanted)
  let forward = argv
  if (text !== null && valueOf(argv, "--input-file") === null) {
    const at = `${mkdtempSync(`${SCRATCH}/mp-payload-`)}/payload.json`
    writeFileSync(at, text)
    forward = [...argv, "--input-file", at]
  }
  const carried = text === null ? [] : carriedIn(text)
  const pairs = [...named, ...pairsOver(carried)]
  const here =
    pairs.some((one) => inside(one.filePath) !== null) ||
    removalsNamed(argv).some((one) => inside(one) !== null)

  if (!here) {
    if (valueOf(argv, PATCH_FILE) !== null) {
      fail(`${PATCH_FILE} is for a call addressing akasha; nothing outside it is landed by patch`)
    }
    await runWriteTool(forward, false)
    return
  }

  const removals = removalsIn(argv)
  const landings = landingsIn(pairs, removals)
  const patch = patchText(landings, removals)

  const held = valueOf(argv, PATCH_FILE)
  if (held !== null) {
    writeFileSync(resolve(process.cwd(), held), patch)
    process.stderr.write(
      `patch: ${patch.length} byte(s) over ${landings.length + removals.length} file(s) — ` +
        "nothing was checked or landed\n"
    )
    return
  }

  const mechanical = argv.includes(MECHANICAL)
  const refused = refusalsOver(patch, mechanical)
  if (refused.length > 0) {
    process.stderr.write(`${refused.join("\n")}\nnothing was written\n`)
    process.exit(1)
  }
  process.stderr.write(
    `gate: ${applying(CHECKS, mechanical).length} akasha check(s) over ` +
      `${landings.length + removals.length} changed file(s), none refused\n`
  )
  await runWriteTool(without(forward, PATCH_FILE), false)
}
