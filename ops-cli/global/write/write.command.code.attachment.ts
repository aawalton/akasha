export const summary = "Write whole files as a patch, gated before anything lands"

import { existsSync, fstatSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { carriesBytes } from "../../../page/file-kind/carries-bytes.ts"
import { sidecarsBeside } from "../../../page/sidecar/sidecar.ts"
import { statingIds } from "./state-id.ts"
import { heldByRepo } from "../../../repo/git/git.ts"
import { land, LandingRefused, type Landing } from "../../../repo/land/land.ts"
import { landOutside, type Loose, removeOutside } from "../../../repo/land/outside.ts"
import { AKASHA } from "../../../repo/roots/roots.ts"
import { addressOf, type Addressed, defaultMessage, rejectUnknownFlags, relPathIn } from "../address.ts"
import { heldToWhatItsAuthorRead } from "../../../agent/authored-write/authored-write.ts"
import { fail, GATED, valueOf } from "../../../patches/patch.ts"
import { patchAside } from "../../../repo/land/body-aside.ts"
import { readPayload, readsPayload } from "../../../tools/lib/payload.ts"

const FILE_PATH = "--file-path"

const CONTENT_FILE = "--content-file"

const PATCH_FILE = "--patch-file"

const INPUT_FILE = "--input-file"

const REMOVE = "--remove"

const REPO = "--repo"

const MESSAGE = "--message"

const MESSAGE_FILE = "--message-file"

const MECHANICAL = "--mechanical"

const DRY_RUN = "--dry-run"

const BREAK_GLASS = "--break-the-glass"

const VALUE_FLAGS = [
  REPO,
  INPUT_FILE,
  FILE_PATH,
  CONTENT_FILE,
  MESSAGE,
  MESSAGE_FILE,
  REMOVE,
  PATCH_FILE,
  BREAK_GLASS,
]

const BARE_FLAGS = [DRY_RUN, MECHANICAL, "--help", "-h"]

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

function carriedIn(read: unknown): readonly Carried[] {
  const many = Array.isArray(read) ? read : [read]
  const found: Carried[] = []
  for (const [at, one] of many.entries()) {
    const where = `entry ${at + 1}`
    if (typeof one !== "object" || one === null) fail(`${where} is not an object`)
    const held = one as Record<string, unknown>
    const filePath = held["file_path"]
    const content = held["content"]
    if (typeof filePath !== "string") fail(`${where} has no \`file_path\` string`)
    if (typeof content !== "string") fail(`${where} has no \`content\` string`)
    found.push({ filePath, content })
  }
  return found
}

function removalsNamed(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] !== REMOVE) continue
    const value = argv[at + 1]
    if (value === undefined || value.startsWith("-")) fail(`${REMOVE} needs a path`)
    at += 1
    found.push(value)
  }
  return found
}

function couldCarryBody(): boolean {
  if (process.stdin.isTTY === true) return false
  try {
    const held = fstatSync(0)
    if (held.isCharacterDevice()) return false
    if (held.isFile()) return held.size > 0
    return true
  } catch {
    return false
  }
}

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "A call addressing akasha is turned into a patch against HEAD and the checks akasha defines " +
    "are run over the files that patch changes, before anything reaches disk. A call addressing " +
    "any other repository lands unjudged, those repositories having no checks. A path inside no " +
    "repository is written where it lies, with nothing committing it.\n" +
    "\n" +
    "Every body reaches this as a whole file. Where the path's extension has a file kind stating " +
    "`binary: true` the bytes land exactly as read; every other body is decoded as UTF-8 and " +
    "refused where it does not decode.",
  flags: [
    { name: REPO, argLabel: "<name>", valueShape: "token" as const, description: "Which repository this addresses. The paths settle it, and a disagreeing --repo is refused." },
    { name: INPUT_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "The tool-call JSON: `{ file_path, content }` or an array of them. `-` is stdin and the default." },
    { name: FILE_PATH, argLabel: "<p>", valueShape: "token" as const, path: true, repeat: true, description: "Convenience form, with --content-file. Repeatable; the pairs are one change set." },
    { name: CONTENT_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, repeat: true, description: "The body for the --file-path before it. `-` is stdin, and a call addressing akasha refuses it." },
    { name: REMOVE, argLabel: "<p>", valueShape: "token" as const, path: true, repeat: true, description: "A path this same act takes away. The writes and the removals are one gated commit." },
    { name: MESSAGE, argLabel: "<s>", valueShape: "prose" as const, description: "Commit message. Defaults to one naming the written paths." },
    { name: MESSAGE_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read the commit message from a file." },
    { name: DRY_RUN, description: "Gate and report; write and commit nothing." },
    { name: MECHANICAL, description: "This body was decided by a program, not authored. The gates about what its writer read stand aside." },
    {
      name: BREAK_GLASS,
      argLabel: "<reason>",
      valueShape: "prose" as const,
      description:
        "Land without running the checks, recording this reason in the commit. For a change that " +
        "must land while the checks themselves are broken.",
    },
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
  positionals: [],
}

export default async function write(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, VALUE_FLAGS, BARE_FLAGS)

  const pairs = pairsIn(argv)
  const inputFile = valueOf(argv, INPUT_FILE)
  if (pairs.length > 0 && inputFile !== null) {
    fail(
      `${INPUT_FILE} and ${FILE_PATH} each carry the bodies this call would write, and both are ` +
        "given — hand the whole change set in through one of them"
    )
  }
  const draining = pairs.filter((one) => one.contentFile === "-")
  if (draining.length > 1) {
    fail(
      `${draining.length} ${CONTENT_FILE} arguments read \`-\`, and stdin is one stream the first ` +
        "would drain — put each body in a file of its own"
    )
  }

  const named = removalsNamed(argv)
  const takingAway = named.length > 0
  const reads = readsPayload(pairs.length, inputFile, takingAway)
  if (!reads && pairs.length === 0 && takingAway && couldCarryBody()) {
    fail(
      `this call takes ${named.length} path(s) away and names no body, and stdin is not a ` +
        "terminal. A removal alone reads no payload, so a body piped here would be dropped and " +
        `only the removal would land. Name it with \`${INPUT_FILE} -\`, or redirect from ` +
        "/dev/null to say the removal stands alone."
    )
  }
  const payload = reads ? await readPayload(inputFile ?? "-") : null
  const carried = payload === null ? [] : carriedIn(payload)
  if (pairs.length === 0 && carried.length === 0) {
    if (!takingAway) fail("the payload declares no file, so it asks for no write at all")
    if (reads) {
      fail(
        "the payload declares no file while this call also takes files away — a write and a " +
          "removal asked for together are one act, and this one asks for no write at all"
      )
    }
  }

  const dryRun = argv.includes(DRY_RUN)
  const mechanical = argv.includes(MECHANICAL)
  const everyPath = [...pairs.map((one) => one.filePath), ...carried.map((one) => one.filePath), ...named]
  const at = addressOf(argv, everyPath)

  const glass = valueOf(argv, BREAK_GLASS)
  if (glass !== null && glass.trim() === "") {
    fail(`${BREAK_GLASS} takes the reason the checks are being bypassed, and this one is empty`)
  }
  if (glass !== null && (at === null || at.repo !== AKASHA)) {
    fail(`${BREAK_GLASS} bypasses the checks akasha defines, and nothing outside akasha is checked`)
  }

  if (at === null) {
    if (valueOf(argv, PATCH_FILE) !== null) {
      fail(`${PATCH_FILE} is for a call addressing akasha; nothing outside it is landed by patch`)
    }
    const loose: Loose[] = []
    for (const one of pairs) {
      const bytes = one.contentFile === "-" ? await Bun.stdin.bytes() : readFileSync(one.contentFile)
      const absolute = resolve(process.cwd(), one.filePath)
      loose.push({ absolute, body: carriesBytes(absolute) ? bytes : bodyText(bytes, one.contentFile) })
    }
    for (const one of carried) {
      const absolute = resolve(process.cwd(), one.filePath)
      if (carriesBytes(absolute)) fail(binaryInJson(absolute))
      loose.push({ absolute, body: one.content })
    }
    if (loose.length > 0) landOutside(loose, dryRun)
    if (named.length > 0) removeOutside(named, dryRun)
    return
  }

  const removals = removalsIn(at, named)
  const removing = new Set(removals)

  const parsed: Landing[] = []
  for (const one of pairs) {
    const relPath = relPathIn(at, one.filePath)
    if (at.repo === AKASHA && one.contentFile === "-") {
      fail(
        `a ${CONTENT_FILE} reads \`-\`, and a patch is built by reading every body twice — once into ` +
          "the patch and once by the write that lands it. Put the body in a file of its own."
      )
    }
    const bytes = one.contentFile === "-" ? await Bun.stdin.bytes() : readFileSync(one.contentFile)
    parsed.push({ relPath, body: carriesBytes(relPath) ? bytes : bodyText(bytes, one.contentFile) })
  }
  for (const one of carried) {
    const relPath = relPathIn(at, one.filePath)
    if (carriesBytes(relPath)) fail(binaryInJson(relPath))
    parsed.push({ relPath, body: one.content })
  }

  const seen = new Set(parsed.map((one) => one.relPath))
  if (seen.size !== parsed.length) fail("a path is declared more than once")
  for (const one of parsed) {
    if (removing.has(one.relPath)) fail(`${one.relPath} is both written and removed by one call`)
  }

  const entries = statingIds(at.repo, at.root, parsed)
  const messageFile = valueOf(argv, MESSAGE_FILE)
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (valueOf(argv, MESSAGE) ?? defaultMessage(at.repo, "write", entries.map((one) => one.relPath)))

  const held = valueOf(argv, PATCH_FILE)
  if (held !== null) {
    if (at.repo !== AKASHA) {
      fail(`${PATCH_FILE} is for a call addressing akasha; nothing outside it is landed by patch`)
    }
    const patch = patchAside(entries, [], removals)
    writeFileSync(resolve(process.cwd(), held), patch)
    process.stderr.write(
      `patch: ${patch.length} byte(s) over ${entries.length + removals.length} file(s) — ` +
        "nothing was checked or landed\n"
    )
    return
  }

  if (at.repo === AKASHA && !mechanical && process.env[GATED] !== "1") {
    heldToWhatItsAuthorRead(at.root, entries)
  }

  try {
    land(at, entries, message, dryRun, removals, [], mechanical, [], new Map(), glass)
  } catch (thrown) {
    if (thrown instanceof LandingRefused) {
      process.stderr.write(`error: ${thrown.message}\n`)
      process.exit(3)
    }
    throw thrown
  }
}

function removalsIn(at: Addressed, named: readonly string[]): readonly string[] {
  const relPaths = named.map((one) => relPathIn(at, one))
  const held = heldByRepo(at.root, relPaths)
  const removals: string[] = []
  for (const relPath of relPaths) {
    const absolute = `${at.root}/${relPath}`
    if (!held.has(relPath)) {
      fail(`${REMOVE} ${relPath} is not there, so the removal would take nothing away`)
    }
    if (existsSync(absolute) && statSync(absolute).isDirectory()) {
      fail(`${REMOVE} ${relPath} is a directory; name its files, so the commit says what went`)
    }
    removals.push(relPath)
  }
  const beside = sidecarsBeside(at.root, removals)
  if (beside.length > 0) {
    process.stderr.write(
      "the files standing beside what you named, which go with it\n" +
        beside.map((one) => `      ${one}\n`).join("")
    )
  }
  return [...removals, ...beside]
}

function bodyText(bytes: Uint8Array, from: string): string {
  const body = decodeUtf8(bytes)
  if (body === null) {
    fail(`${from === "-" ? "stdin" : from} is not UTF-8 text, and this path's file kind does not carry bytes`)
  }
  return body
}

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.includes("--help") || own.includes("-h")) {
    process.stdout.write(
      "This is the write command's own entry point, for a caller that would pay to load every " +
        "other command through `ops`. Its help is `ops write --help`.\n"
    )
  } else {
    await write(own)
  }
}

function binaryInJson(at: string): string {
  return (
    `${at} is of a file kind stating \`binary: true\`, and this payload is JSON, whose \`content\` ` +
    `is a string. Hand it in as the file it already is: ${FILE_PATH} ${at} ${CONTENT_FILE} <path>.`
  )
}
