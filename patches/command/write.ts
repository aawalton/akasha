export const summary = "Write whole files as a patch, gated before anything lands"

import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import {
  bodyFile,
  fail,
  gateOrRefuse,
  inside,
  type Landing,
  mustBeInside,
  patchText,
  payloadText,
  runTool,
  valueOf,
  without,
} from "../patch.ts"

const WRITE_TOOL = "write.ts"

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

function pairsOver(carried: readonly Carried[]): readonly Pair[] {
  const pairs: Pair[] = []
  for (const one of carried) {
    if (inside(one.filePath) === null) continue
    pairs.push({ filePath: one.filePath, contentFile: bodyFile(one.content) })
  }
  return pairs
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
  epilog: () => runTool(WRITE_TOOL, ["--help"], true),
}

export default async function write(argv: readonly string[]): Promise<void> {
  const named = pairsIn(argv)
  const wanted = named.length === 0 && removalsNamed(argv).length === 0
  const text = argv.includes("--help") ? null : payloadText(argv, wanted)
  let forward = argv
  if (text !== null && valueOf(argv, "--input-file") === null) {
    forward = [...argv, "--input-file", bodyFile(text)]
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
    await runTool(WRITE_TOOL, forward, false)
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

  gateOrRefuse(patch, argv.includes(MECHANICAL), landings.length + removals.length)
  await runTool(WRITE_TOOL, without(forward, PATCH_FILE), false)
}
