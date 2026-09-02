export const summary = "Replace one exact string wherever it appears, gating every file it changes"

import { existsSync, readFileSync, statSync } from "node:fs"
import { resolve } from "node:path"
import { git } from "../../../repo/git/git.ts"
import { land, LandingRefused, type Landing } from "../../../repo/land/land.ts"
import { landOutside, type Loose } from "../../../repo/land/outside.ts"
import { decodeUtf8, leadingBytes } from "../../../utf8-body/utf8-body.ts"
import { addressOf, type Addressed, defaultMessage, rejectUnknownFlags, relPathIn } from "../address.ts"
import { fail, valueOf } from "../../../patches/patch.ts"

const REPO = "--repo"

const OLD_STRING = "--old-string"

const OLD_STRING_FILE = "--old-string-file"

const NEW_STRING = "--new-string"

const NEW_STRING_FILE = "--new-string-file"

const MESSAGE = "--message"

const MESSAGE_FILE = "--message-file"

const DRY_RUN = "--dry-run"

const VALUE_FLAGS = [REPO, OLD_STRING, OLD_STRING_FILE, NEW_STRING, NEW_STRING_FILE, MESSAGE, MESSAGE_FILE]

const BARE_FLAGS = [DRY_RUN, "--help", "-h"]

interface Scanned {
  readonly absolute: string
  readonly relPath: string
}

interface Rewrite extends Scanned {
  readonly body: string
  readonly occurrences: number
  readonly at: number
}

function nameOf(one: Scanned): string {
  return one.relPath === "" ? one.absolute : one.relPath
}

function namedIn(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at] as string
    if (VALUE_FLAGS.includes(token)) {
      at += 1
      continue
    }
    if (token.startsWith("-")) continue
    found.push(token)
  }
  return found.length === 0 ? [process.cwd()] : found
}

function stated(argv: readonly string[], inline: string, fromFile: string): string | null {
  const direct = valueOf(argv, inline)
  const path = valueOf(argv, fromFile)
  if (direct !== null && path !== null) fail(`${inline} and ${fromFile} name the same string twice`)
  if (path === null) return direct
  let bytes: Uint8Array
  try {
    bytes = readFileSync(resolve(process.cwd(), path))
  } catch (thrown) {
    return fail(
      `${fromFile} could not be read from ${path}: ${thrown instanceof Error ? thrown.message : String(thrown)}`
    )
  }
  const body = decodeUtf8(bytes)
  if (body === null) {
    fail(`${path} is not UTF-8 text, so no string can be read off it — it begins ${leadingBytes(bytes)}`)
  }
  return body
}

function scopesIn(at: Addressed, paths: readonly string[]): readonly string[] {
  return paths.map((one) => (resolve(process.cwd(), one) === at.root ? "" : relPathIn(at, one)))
}

function trackedUnder(at: Addressed, scopes: readonly string[]): readonly Scanned[] {
  const whole = scopes.includes("")
  const listed = git(at.root, whole ? ["ls-files", "-z"] : ["ls-files", "-z", "--", ...scopes])
  if (listed.code !== 0) fail(`git could not list what ${at.root} tracks: ${listed.stderr}`)
  return listed.stdout
    .split("\0")
    .filter((one) => one !== "")
    .map((relPath) => ({ absolute: `${at.root}/${relPath}`, relPath }))
}

function looseTargets(paths: readonly string[]): readonly Scanned[] {
  const absolutes = [...new Set(paths.map((one) => resolve(process.cwd(), one)))]
  const refusals: string[] = []
  for (const absolute of absolutes) {
    if (!existsSync(absolute)) {
      refusals.push(`${absolute} is not there — \`replace\` rewrites a file that is`)
      continue
    }
    if (!statSync(absolute).isFile()) {
      refusals.push(
        `${absolute} is a directory no repo holds, so nothing says which files under it would be ` +
          "searched — name them"
      )
    }
  }
  if (refusals.length > 0) fail(refusals.join("\n       "))
  return absolutes.map((absolute) => ({ absolute, relPath: "" }))
}

function rewrites(
  targets: readonly Scanned[],
  old: string,
  next: string
): { readonly found: readonly Rewrite[]; readonly binary: readonly string[] } {
  const found: Rewrite[] = []
  const binary: string[] = []
  for (const one of targets) {
    let bytes: Uint8Array
    let at: number
    try {
      at = statSync(one.absolute).mtimeMs
      bytes = readFileSync(one.absolute)
    } catch {
      continue
    }
    const body = decodeUtf8(bytes)
    if (body === null || bytes.includes(0)) {
      if (new TextDecoder().decode(bytes).includes(old)) binary.push(nameOf(one))
      continue
    }
    const occurrences = body.split(old).length - 1
    if (occurrences === 0) continue
    found.push({ ...one, body: body.split(old).join(next), occurrences, at })
  }
  return { found, binary }
}

function refuseWhatMoved(found: readonly Rewrite[]): void {
  const moved = found.filter((one) => {
    try {
      return statSync(one.absolute).mtimeMs !== one.at
    } catch {
      return true
    }
  })
  if (moved.length === 0) return
  fail(
    `${moved.map(nameOf).join(", ")} changed after this call read it, so the body composed for it ` +
      "is not the body on disk — nothing was written; run it again"
  )
}

export const help = {
  flags: [
    { name: REPO, argLabel: "<name>", valueShape: "token" as const, description: "Which repository this addresses. The paths settle it, and a disagreeing --repo is refused." },
    { name: OLD_STRING, argLabel: "<s>", valueShape: "prose" as const, description: "The exact text to replace. The key `edit` calls it by." },
    { name: OLD_STRING_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read --old-string from this file, for text a shell cannot carry." },
    { name: NEW_STRING, argLabel: "<s>", valueShape: "prose" as const, description: "What replaces it. An empty one is legitimate and deletes the text." },
    { name: NEW_STRING_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read --new-string from this file." },
    { name: MESSAGE, argLabel: "<s>", valueShape: "prose" as const, description: "Commit message. Defaults to one naming the rewritten paths." },
    { name: MESSAGE_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read the commit message from a file." },
    { name: DRY_RUN, description: "Search, compose, gate and report; write and commit nothing." },
  ],
  mutuallyExclusive: [
    [OLD_STRING, OLD_STRING_FILE],
    [NEW_STRING, NEW_STRING_FILE],
  ],
  positionals: [
    {
      name: "paths",
      variadic: true,
      description: "Where to search, absolute or against the directory this ran in. A directory opens onto every tracked file under it, and with none named the directory this ran in is the one searched.",
    },
  ],
}

export default async function replace(argv: readonly string[]): Promise<void> {
  if (argv.includes("--help") || argv.includes("-h")) return
  rejectUnknownFlags(argv, VALUE_FLAGS, BARE_FLAGS)

  const paths = namedIn(argv)
  const old = stated(argv, OLD_STRING, OLD_STRING_FILE)
  const next = stated(argv, NEW_STRING, NEW_STRING_FILE)
  if (old === null) fail(`${OLD_STRING} names the text to replace, and none was given`)
  if (next === null) fail(`${NEW_STRING} names what replaces it; give an empty one to delete the text`)
  if (old === "") fail(`${OLD_STRING} is empty, which matches everywhere and nowhere`)
  if (old === next) fail(`${OLD_STRING} and ${NEW_STRING} are identical, so this asks for no change`)

  const at = addressOf(argv, paths)
  const targets = at === null ? looseTargets(paths) : trackedUnder(at, scopesIn(at, paths))
  const { found, binary } = rewrites(targets, old, next)
  for (const one of binary) {
    process.stderr.write(
      `passed over: ${one} holds a NUL byte or bytes that are not UTF-8, so it was not decoded\n`
    )
  }
  if (found.length === 0) {
    fail(
      `nothing ${at === null ? "" : "git tracks "}under ${paths.join(", ")} carries that string, ` +
        "so there is nothing here to replace"
    )
  }

  const occurrences = found.reduce((sum, one) => sum + one.occurrences, 0)
  process.stderr.write(
    [
      `replace: ${found.length} file(s), ${occurrences} occurrence(s)`,
      ...found.map((one) => `        ${nameOf(one)}  ${one.occurrences}`),
    ].join("\n") + "\n"
  )
  refuseWhatMoved(found)

  const dryRun = argv.includes(DRY_RUN)
  if (at === null) {
    const loose: Loose[] = found.map((one) => ({ absolute: one.absolute, body: one.body }))
    landOutside(loose, dryRun)
    return
  }

  const landings: Landing[] = found.map((one) => ({ relPath: one.relPath, body: one.body }))
  const messageFile = valueOf(argv, MESSAGE_FILE)
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (valueOf(argv, MESSAGE) ?? defaultMessage(at.repo, "replace", landings.map((one) => one.relPath)))

  try {
    land(at, landings, message, dryRun, [], [], true)
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
      "This is the replace command's own entry point, for a caller that would pay to load every " +
        "other command through `ops`. Its help is `ops replace --help`.\n"
    )
  } else {
    await replace(own)
  }
}
