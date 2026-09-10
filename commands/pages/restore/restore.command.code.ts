import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { said as gitIn } from "../../../git/running/git-running.module.code.ts"
import { type Answer, answering, type Given } from "../../modules/calling/calling.module.code.ts"
import { bodyAt } from "../../modules/commit-reading/commit-reading.module.code.ts"
import { saidBy } from "../../modules/fault-saying/fault-saying.module.code.ts"
import { FILE_PATH } from "../../modules/flags/command-flags.module.code.ts"
import { offRepo, pathAt } from "../../modules/said-pathing/said-pathing.module.code.ts"

const HEAD = "HEAD"

const BLOB = "blob"

const STAGED = "0"

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

export function unheld(path: string): string {
  return (
    `HEAD holds no ${path}, so \`akasha restore\` has nothing to put back there — a path HEAD ` +
    "does not hold is often work another agent has not landed, so this refuses rather than " +
    "deleting it"
  )
}

export function notAFile(path: string, entry: Entry): string {
  return (
    `HEAD holds ${path} as a ${entry.kind} rather than a file, and \`akasha restore\` puts back ` +
    "one file at a time — name the files under it"
  )
}

export function wrongMode(path: string, entry: Entry): string {
  return (
    `HEAD holds ${path} with mode ${entry.mode}, and \`akasha restore\` puts back a file with ` +
    "mode 100644 or 100755 alone"
  )
}

function heldFor(root: string, path: string, entry: Entry, indexed?: Entry): Held | string {
  if (entry.kind !== BLOB) return notAFile(path, entry)
  if (!MODES.has(entry.mode)) return wrongMode(path, entry)
  const body = bodyAt(root, HEAD, path)
  if (body === null) {
    return `HEAD names ${path} and holds no body for it, so \`akasha restore\` put nothing back`
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

type Judged = { readonly held: readonly Held[] } | { readonly refusals: readonly string[] }

export function judgedIn(root: string, paths: readonly string[]): Judged {
  let head: ReadonlyMap<string, Entry>
  let indexed: ReadonlyMap<string, Entry>
  try {
    head = headEntries(root, paths)
    indexed = indexEntries(root, paths)
  } catch (why) {
    return {
      refusals: [
        "git could not say what HEAD and the git index hold, so `akasha restore` put nothing " +
          `back — ${saidBy(why)}`,
      ],
    }
  }
  const held: Held[] = []
  const refusals: string[] = []
  for (const path of paths) {
    const entry = head.get(path)
    if (entry === undefined) {
      refusals.push(unheld(path))
      continue
    }
    const one = heldFor(root, path, entry, indexed.get(path))
    if (typeof one === "string") refusals.push(one)
    else held.push(one)
  }
  return refusals.length > 0 ? { refusals } : { held }
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

function staged(root: string, going: readonly Held[]): undefined {
  if (going.length === 0) return
  const lines = going.map((one) => `${one.entry.mode} ${one.entry.oid} ${STAGED}\t${one.path}`)
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

function counted(many: number): string {
  return many === 1 ? "1 path" : `${many} paths`
}

export function reportOf(going: readonly Held[], left: readonly Held[]): readonly string[] {
  const report: string[] = []
  if (going.length > 0) {
    report.push(
      `akasha restore is discarding uncommitted work at ${counted(going.length)}, and nothing ` +
        "holds that work after this:",
      ...going.map(goingSaid),
      ""
    )
  }
  for (const one of going) {
    report.push(`${one.path} is the body HEAD holds again, on disk and in the git index`)
  }
  for (const one of left) {
    report.push(`${one.path} is already the body HEAD holds, so akasha restore left it alone`)
  }
  report.push(
    "",
    "akasha restore committed nothing and ran no check — HEAD's body passed the checks when " +
      "HEAD's body landed."
  )
  return report
}

export function restore(argv: readonly string[], given: Given): Answer {
  const read = namedIn(argv)
  if ("refused" in read) return answering([], [read.refused], 1)
  if (read.named.length === 0) {
    return answering([], [`name at least one path to restore, as \`${FILE_PATH} <path>\``], 1)
  }
  const root = resolve(given.root)
  const wanted = pathsIn(root, read.named)
  if ("refusals" in wanted) return answering([], wanted.refusals, 1)
  const judged = judgedIn(root, wanted.paths)
  if ("refusals" in judged) return answering([], judged.refusals, 1)
  const going = judged.held.filter((one) => !one.diskHolds || !one.indexHolds)
  const left = judged.held.filter((one) => one.diskHolds && one.indexHolds)
  const done: Held[] = []
  try {
    for (const one of going) {
      putBack(root, one)
      done.push(one)
    }
    staged(root, going)
  } catch (why) {
    return answering(
      done.map((one) => `${one.path} is the body HEAD holds again on disk`),
      [
        "akasha restore stopped part way, so the git index may still hold another body — " +
          `${saidBy(why)}`,
      ],
      1
    )
  }
  return answering(reportOf(going, left), [], 0)
}
