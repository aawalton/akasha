import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  type Answer,
  answeredWith,
  type Given,
} from "akasha/commands/modules/calling/calling.module.code.ts"
import { FILE_PATH } from "akasha/commands/modules/flags/command-flags.module.code.ts"
import { offRepo, pathAt } from "akasha/commands/modules/said-pathing/said-pathing.module.code.ts"
import { bodyAt } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import { said as gitIn } from "akasha/git/running/git-running.module.code.ts"
import { anythingThere } from "akasha/utils/fs/anything-there/anything-there.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const HEAD = "HEAD"

const BLOB = "blob"

const STAGED = "0"

const GONE = "0"

const NO_OID = "0".repeat(40)

const MODES = new Map<string, number>([
  ["100644", 0o644],
  ["100755", 0o755],
])

const TREE_ENTRY = /^(\d{6}) ([a-z]+) ([0-9a-f]+)\t(.*)$/

const INDEX_ENTRY = /^(\d{6}) ([0-9a-f]+) ([0-3])\t(.*)$/

export type Entry = {
  readonly mode: string
  readonly kind: string
  readonly oid: string
}

export type Held = {
  readonly path: string
  readonly entry: Entry
  readonly body: Uint8Array
  readonly was: Uint8Array | null
  readonly diskHolds: boolean
  readonly indexHolds: boolean
}

export type Cleared = {
  readonly path: string
  readonly entry: Entry
}

export type Read = { readonly named: readonly string[] } | { readonly refused: string }

export function namedIn(argv: readonly string[]): Read {
  const named: string[] = []
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (token === FILE_PATH) {
      const value = argv[at + 1]
      if (value === undefined) return { refused: `${FILE_PATH} takes a path, and none follows it` }
      if (value.startsWith("-")) {
        return { refused: `${FILE_PATH} takes a path, and \`${value}\` names another flag` }
      }
      named.push(value)
      at = at + 2
      continue
    }
    if (token.startsWith("-")) {
      return {
        refused:
          `\`${token}\` is not a flag this takes — a restore names its paths as ` +
          `\`${FILE_PATH} <path>\` and takes nothing else`,
      }
    }
    return {
      refused:
        `\`${token}\` carries no flag before it, and a restore names every path behind a flag — ` +
        `say \`${FILE_PATH} ${token}\``,
    }
  }
  return { named }
}

export function headEntries(root: string, paths: readonly string[]): ReadonlyMap<string, Entry> {
  const found = new Map<string, Entry>()
  for (const one of gitIn(root, ["ls-tree", "-z", HEAD, "--", ...paths]).split("\0")) {
    const read = TREE_ENTRY.exec(one)
    if (read === null) continue
    found.set(read[4] ?? "", { mode: read[1] ?? "", kind: read[2] ?? "", oid: read[3] ?? "" })
  }
  return found
}

export function indexEntries(root: string, paths: readonly string[]): ReadonlyMap<string, Entry> {
  const found = new Map<string, Entry>()
  for (const one of gitIn(root, ["ls-files", "-s", "-z", "--", ...paths]).split("\0")) {
    const read = INDEX_ENTRY.exec(one)
    if (read === null || read[3] !== STAGED) continue
    found.set(read[4] ?? "", { mode: read[1] ?? "", kind: BLOB, oid: read[2] ?? "" })
  }
  return found
}

export function sameBytes(one: Uint8Array | null, other: Uint8Array): boolean {
  if (one === null || one.length !== other.length) return false
  for (let at = 0; at < one.length; at += 1) {
    if (one[at] !== other[at]) return false
  }
  return true
}

function bytesOnDisk(at: string): Uint8Array | null {
  try {
    return new Uint8Array(readFileSync(at))
  } catch {
    return null
  }
}

export function unheld(path: string, calledAs: string): string {
  return (
    `HEAD holds no ${path}, so \`${calledAs}\` has nothing to put back there — a path HEAD ` +
    "does not hold is often work another agent has not landed, so this refuses rather than " +
    "deleting it"
  )
}

export function unlanded(path: string, calledAs: string): string {
  return (
    `HEAD holds no ${path}, the git index holds it, and the working tree holds it too — that is ` +
    `work another agent staged and has not landed, so \`${calledAs}\` refuses rather than ` +
    "deleting it"
  )
}

export function unclearable(path: string, entry: Entry, calledAs: string): string {
  return (
    `HEAD holds no ${path} and the git index holds it with mode ${entry.mode}, and ` +
    `\`${calledAs}\` clears a git index entry for a file with mode 100644 or 100755 alone`
  )
}

export function notAFile(path: string, entry: Entry, calledAs: string): string {
  return (
    `HEAD holds ${path} as a ${entry.kind} rather than a file, and \`${calledAs}\` puts back ` +
    "one file at a time — name the files under it"
  )
}

export function wrongMode(path: string, entry: Entry, calledAs: string): string {
  return (
    `HEAD holds ${path} with mode ${entry.mode}, and \`${calledAs}\` puts back a file with ` +
    "mode 100644 or 100755 alone"
  )
}

function heldFor(
  root: string,
  path: string,
  entry: Entry,
  calledAs: string,
  indexed?: Entry
): Held | string {
  if (entry.kind !== BLOB) return notAFile(path, entry, calledAs)
  if (!MODES.has(entry.mode)) return wrongMode(path, entry, calledAs)
  const body = bodyAt(root, HEAD, path)
  if (body === null) {
    return `HEAD names ${path} and holds no body for it, so \`${calledAs}\` put nothing back`
  }
  const was = bytesOnDisk(join(root, path))
  return {
    path,
    entry,
    body,
    was,
    diskHolds: sameBytes(was, body),
    indexHolds: indexed !== undefined && indexed.mode === entry.mode && indexed.oid === entry.oid,
  }
}

function residueFor(
  root: string,
  path: string,
  indexed: Entry | undefined,
  calledAs: string
): Cleared | string {
  if (indexed === undefined) return unheld(path, calledAs)
  if (anythingThere(join(root, path))) return unlanded(path, calledAs)
  if (!MODES.has(indexed.mode)) return unclearable(path, indexed, calledAs)
  return { path, entry: indexed }
}

type Judged =
  | { readonly held: readonly Held[]; readonly cleared: readonly Cleared[] }
  | { readonly refusals: readonly string[]; readonly code?: number }

export function judgedIn(root: string, paths: readonly string[], calledAs: string): Judged {
  let head: ReadonlyMap<string, Entry>
  let indexed: ReadonlyMap<string, Entry>
  try {
    head = headEntries(root, paths)
    indexed = indexEntries(root, paths)
  } catch (why) {
    return {
      refusals: [
        `git could not say what HEAD and the git index hold, so \`${calledAs}\` put nothing ` +
          `back — ${saidBy(why)}`,
      ],
      code: OPERATIONAL,
    }
  }
  const held: Held[] = []
  const cleared: Cleared[] = []
  const refusals: string[] = []
  for (const path of paths) {
    const entry = head.get(path)
    if (entry === undefined) {
      const residue = residueFor(root, path, indexed.get(path), calledAs)
      if (typeof residue === "string") refusals.push(residue)
      else cleared.push(residue)
      continue
    }
    const one = heldFor(root, path, entry, calledAs, indexed.get(path))
    if (typeof one === "string") refusals.push(one)
    else held.push(one)
  }
  return refusals.length > 0 ? { refusals } : { held, cleared }
}

type Wanted = { readonly paths: readonly string[] } | { readonly refusals: readonly string[] }

export function pathsIn(root: string, named: readonly string[]): Wanted {
  const paths: string[] = []
  const refusals: string[] = []
  const seen = new Set<string>()
  for (const one of named) {
    const path = pathAt(root, one)
    if (path === null) {
      refusals.push(offRepo(one))
      continue
    }
    if (seen.has(path)) {
      refusals.push(`${path} is named more than once`)
      continue
    }
    seen.add(path)
    paths.push(path)
  }
  return refusals.length > 0 ? { refusals } : { paths }
}

function putBack(root: string, one: Held): undefined {
  const at = join(root, one.path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, one.body)
  chmodSync(at, MODES.get(one.entry.mode) ?? 0o644)
}

function indexWritten(
  root: string,
  going: readonly Held[],
  cleared: readonly Cleared[]
): undefined {
  const lines = [
    ...going.map((one) => `${one.entry.mode} ${one.entry.oid} ${STAGED}\t${one.path}`),
    ...cleared.map((one) => `${GONE} ${NO_OID}\t${one.path}`),
  ]
  if (lines.length === 0) return
  gitIn(root, ["update-index", "--index-info"], {
    stdin: new TextEncoder().encode(`${lines.join("\n")}\n`),
  })
}

function diskSaid(one: Held): string {
  if (one.was === null) return "nothing is on disk"
  if (one.diskHolds) return "the working tree already holds HEAD's body"
  return `the working tree holds ${one.was.length} bytes where HEAD holds ${one.body.length}`
}

function goingSaid(one: Held): string {
  const index = one.indexHolds
    ? "the git index already holds HEAD's body"
    : "the git index holds another body"
  return `  ${one.path} — ${diskSaid(one)}, and ${index}`
}

function clearedSaid(one: Cleared): string {
  return `  ${one.path} — nothing is on disk, HEAD holds no body, and the git index holds a body`
}

function counted(many: number): string {
  return many === 1 ? "1 path" : `${many} paths`
}

export function reportOf(
  going: readonly Held[],
  left: readonly Held[],
  cleared: readonly Cleared[],
  calledAs: string
): readonly string[] {
  const report: string[] = []
  if (going.length > 0) {
    report.push(
      `${calledAs} is discarding uncommitted work at ${counted(going.length)}, and nothing ` +
        "holds that work after this:",
      ...going.map(goingSaid),
      ""
    )
  }
  if (cleared.length > 0) {
    report.push(
      `${calledAs} is clearing a git index entry at ${counted(cleared.length)}, and the ` +
        "entry is all that goes — no commit held that body and no file on disk holds it:",
      ...cleared.map(clearedSaid),
      ""
    )
  }
  for (const one of going) {
    report.push(`${one.path} is the body HEAD holds again, on disk and in the git index`)
  }
  for (const one of cleared) {
    report.push(
      `${one.path} is out of the git index, and HEAD and the working tree hold nothing there`
    )
  }
  for (const one of left) {
    report.push(`${one.path} is already the body HEAD holds, so ${calledAs} left it alone`)
  }
  report.push(
    "",
    `${calledAs} committed nothing and ran no check — HEAD's body passed the checks when ` +
      "HEAD's body landed."
  )
  return report
}

export function gitRestore(argv: readonly string[], given: Given): Answer {
  const read = namedIn(argv)
  if ("refused" in read) return answeredWith([], [read.refused], 1)
  if (read.named.length === 0) {
    return answeredWith([], [`name at least one path to restore, as \`${FILE_PATH} <path>\``], 1)
  }
  const root = resolve(given.root)
  const wanted = pathsIn(root, read.named)
  if ("refusals" in wanted) return answeredWith([], wanted.refusals, 1)
  const judged = judgedIn(root, wanted.paths, given.calledAs)
  if ("refusals" in judged) return answeredWith([], judged.refusals, judged.code ?? 1)
  const going = judged.held.filter((one) => !one.diskHolds || !one.indexHolds)
  const left = judged.held.filter((one) => one.diskHolds && one.indexHolds)
  const done: Held[] = []
  try {
    for (const one of going) {
      putBack(root, one)
      done.push(one)
    }
    indexWritten(root, going, judged.cleared)
  } catch (why) {
    return answeredWith(
      done.map((one) => `${one.path} is the body HEAD holds again on disk`),
      [
        `${given.calledAs} stopped part way, so the git index may still hold another body — ` +
          `${saidBy(why)}`,
      ],
      OPERATIONAL
    )
  }
  return answeredWith(reportOf(going, left, judged.cleared, given.calledAs), [], 0)
}
