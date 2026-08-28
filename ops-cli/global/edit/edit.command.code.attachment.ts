export const summary = "Change passages in place by exact-string replacement, gating the whole result"

import { existsSync, readFileSync, statSync } from "node:fs"
import { resolve } from "node:path"
import { decodeUtf8, leadingBytes } from "../../../utf8-body/utf8-body.ts"
import { land, LandingRefused, type Landing } from "../../../repo/land/land.ts"
import { landOutside, type Loose } from "../../../repo/land/outside.ts"
import { applyPairs, parsePairs } from "../../../patches/edit-pairs.ts"
import { addressOf, type Addressed, defaultMessage, rejectUnknownFlags, relPathIn } from "../address.ts"
import { heldToWhatItsAuthorRead } from "../../../agent/authored-write/authored-write.ts"
import { AKASHA } from "../../../repo/roots/roots.ts"
import { fail, GATED, payloadText, valueOf } from "../../../patches/patch.ts"

const INPUT_FILE = "--input-file"

const REPO = "--repo"

const MESSAGE = "--message"

const MESSAGE_FILE = "--message-file"

const MECHANICAL = "--mechanical"

const DRY_RUN = "--dry-run"

const VALUE_FLAGS = [REPO, INPUT_FILE, MESSAGE, MESSAGE_FILE]

const BARE_FLAGS = [DRY_RUN, MECHANICAL, "--help", "-h"]

interface Declared {
  readonly filePath: string
  readonly source: Record<string, unknown>
}

interface Prepared {
  readonly absolute: string
  readonly relPath: string
  readonly body: string
  readonly at: number
}

function declaredIn(text: string, from: string): readonly Declared[] {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch (thrown) {
    fail(`${from} is not JSON this can read: ${thrown instanceof Error ? thrown.message : thrown}`)
  }
  const many = Array.isArray(read) ? read : [read]
  const found: Declared[] = []
  for (const [at, one] of many.entries()) {
    const where = `entry ${at + 1}`
    if (typeof one !== "object" || one === null) fail(`${where} is not an object`)
    const held = one as Record<string, unknown>
    const filePath = held["file_path"]
    if (typeof filePath !== "string") fail(`${where} has no \`file_path\` string`)
    found.push({ filePath, source: held })
  }
  return found
}

function prepare(declared: readonly Declared[], at: Addressed | null): readonly Prepared[] {
  const entries: Prepared[] = []
  const refusals: string[] = []
  for (const one of declared) {
    const relPath = at === null ? "" : relPathIn(at, one.filePath)
    const absolute = at === null ? resolve(process.cwd(), one.filePath) : `${at.root}/${relPath}`
    const named = at === null ? absolute : relPath
    if (!existsSync(absolute)) {
      refusals.push(`${named} is not there — \`edit\` changes a file that is, and \`write\` makes one`)
      continue
    }
    const stamp = statSync(absolute)
    if (!stamp.isFile()) {
      refusals.push(`${named} is not a file`)
      continue
    }
    const bytes = readFileSync(absolute)
    const body = decodeUtf8(bytes)
    if (body === null) {
      refusals.push(
        `${named} is not UTF-8 text, so no substitution can be stated against it — it begins ${leadingBytes(bytes)}`
      )
      continue
    }
    let applied: { body: string } | { refusal: string }
    try {
      applied = applyPairs(body, parsePairs(one.source, named))
    } catch (thrown) {
      refusals.push(thrown instanceof Error ? thrown.message : String(thrown))
      continue
    }
    if ("refusal" in applied) {
      refusals.push(`${named} ${applied.refusal}`)
      continue
    }
    entries.push({ absolute, relPath, body: applied.body, at: stamp.mtimeMs })
  }
  if (refusals.length > 0) {
    process.stderr.write(`refused:\n${refusals.map((one) => `  ${one}`).join("\n")}\nnothing was written\n`)
    process.exit(1)
  }
  return entries
}

function mtimeNow(absolute: string): number | null {
  try {
    return statSync(absolute).mtimeMs
  } catch {
    return null
  }
}

function refuseWhatMoved(entries: readonly Prepared[]): void {
  const moved = entries.filter((one) => mtimeNow(one.absolute) !== one.at)
  if (moved.length === 0) return
  fail(
    `${moved.map((one) => one.relPath === "" ? one.absolute : one.relPath).join(", ")} changed after ` +
      "this call read it, so the body composed for it is not the body on disk — nothing was " +
      "written; run it again"
  )
}

export const help = {
  description:
    `${summary}.\n` +
    "\n" +
    "Takes the object the native Edit tool takes — `{ file_path, old_string, new_string, " +
    "replace_all }` — on stdin or from --input-file. An `edits` array of those same objects " +
    "applies several to one file, in order, each judged against what the one before produced. An " +
    "array of the whole thing is one act across several files, admitted whole or refused whole.\n" +
    "\n" +
    "Each pair must match uniquely: no match refuses, because the body is not what the caller " +
    "thought; more than one refuses, because the caller did not say which. `replace_all` widens a " +
    "pair to every occurrence, and no match still refuses. Every refusal names the file as well " +
    "as the pair, and every file that could not be prepared is named at once.\n" +
    "\n" +
    "Exact strings rather than a diff: a generated diff goes wrong at line offsets and context " +
    "windows, and fails in a way that still looks applicable, which is the worst shape for a " +
    "command whose job is refusing bad input.\n" +
    "\n" +
    "A call addressing akasha has its substitutions applied here to work out the body each file " +
    "would end at, and the checks akasha defines are run over those bodies before any reaches " +
    "disk. A call addressing any other repository lands unjudged. A path inside no repository is " +
    "written where it lies, with nothing committing it.\n" +
    "\n" +
    "A file that changes between the read a body was composed from and the write that lands it " +
    "refuses the whole call, by mtime, naming every file that moved. What lands is the whole " +
    "body, so a change made elsewhere in the file would be reverted with nothing saying so.",
  flags: [
    { name: REPO, argLabel: "<name>", valueShape: "token" as const, description: "Which repository this addresses. The paths settle it, and a disagreeing --repo is refused." },
    { name: INPUT_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "The tool-call JSON; `-` is stdin and the default." },
    { name: MESSAGE, argLabel: "<s>", valueShape: "prose" as const, description: "Commit message. Defaults to one naming the edited paths." },
    { name: MESSAGE_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read the commit message from a file." },
    { name: DRY_RUN, description: "Gate and report; write and commit nothing." },
    { name: MECHANICAL, description: "This substitution was decided by a program, not authored. The gates about what its writer read stand aside." },
  ],
  positionals: [],
}

export default async function edit(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, VALUE_FLAGS, BARE_FLAGS)

  const inputFile = valueOf(argv, INPUT_FILE)
  const text = payloadText(argv, true)
  if (text === null) fail(`this call carries no payload — hand the tool-call JSON in on stdin or with ${INPUT_FILE}`)
  const declared = declaredIn(text, inputFile === null || inputFile === "-" ? "stdin" : inputFile)
  if (declared.length === 0) fail("the payload declares no file, so it asks for no change at all")

  const everyPath = declared.map((one) => resolve(process.cwd(), one.filePath))
  if (new Set(everyPath).size !== everyPath.length) fail("a path is declared more than once")

  const at = addressOf(argv, declared.map((one) => one.filePath))
  const entries = prepare(declared, at)
  refuseWhatMoved(entries)

  const dryRun = argv.includes(DRY_RUN)
  if (at === null) {
    const loose: Loose[] = entries.map((one) => ({ absolute: one.absolute, body: one.body }))
    landOutside(loose, dryRun)
    return
  }

  const landings: Landing[] = entries.map((one) => ({ relPath: one.relPath, body: one.body }))
  const messageFile = valueOf(argv, MESSAGE_FILE)
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (valueOf(argv, MESSAGE) ?? defaultMessage(at.repo, "edit", landings.map((one) => one.relPath)))

  // ONLY `write` AND `edit` HOLD A WRITE TO WHAT ITS AUTHOR READ — never the gate beneath them.
  if (at.repo === AKASHA && !argv.includes(MECHANICAL) && process.env[GATED] !== "1") {
    heldToWhatItsAuthorRead(at.root, landings)
  }

  try {
    land(at, landings, message, dryRun, [], [], argv.includes(MECHANICAL))
  } catch (thrown) {
    if (thrown instanceof LandingRefused) {
      process.stderr.write(`error: ${thrown.message}\n`)
      process.exit(3)
    }
    throw thrown
  }
}

if (import.meta.main) {
  const own = process.argv.slice(2)
  if (own.includes("--help") || own.includes("-h")) {
    process.stdout.write(
      "This is the edit command's own entry point, for a caller that would pay to load every " +
        "other command through `ops`. Its help is `ops edit --help`.\n"
    )
  } else {
    await edit(own)
  }
}
