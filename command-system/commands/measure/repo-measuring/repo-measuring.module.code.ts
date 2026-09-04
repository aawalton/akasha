import { readFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitSaid } from "@akasha/git/git-running"

const PARTED_BY = "\0"

const LISTED: readonly string[] = ["ls-files", "-z", "--cached", "--others", "--exclude-standard"]

const NEWLINE = 10

const MADE_IN: readonly string[] = ["generated", "build", "dist", "out", "coverage"]

const MADE_NAME = /\.generated\.[^.]+$/

const TOTAL = "total"

const HEADING: readonly string[] = ["type", "files", "lines"]

const GAP = "  "

export interface FileType {
  readonly type: string
  readonly files: number
  readonly lines: number
}

export interface Counts {
  readonly types: readonly FileType[]
  readonly files: number
  readonly lines: number
  readonly unread: readonly string[]
}

function pathsIn(root: string): readonly string[] {
  const said = gitSaid(root, LISTED)
  return [...new Set(said.split(PARTED_BY).filter((one) => one !== ""))]
}

export function madeBy(path: string): boolean {
  const parts = path.split("/")
  const name = parts[parts.length - 1] ?? ""
  if (parts.slice(0, -1).some((one) => MADE_IN.includes(one))) return true
  return MADE_NAME.test(name)
}

export function typeOf(path: string): string {
  const name = path.slice(path.lastIndexOf("/") + 1)
  const at = name.lastIndexOf(".")
  return at < 1 ? name : name.slice(at + 1)
}

export function linesIn(body: Uint8Array): number {
  if (body.length === 0) return 0
  let seen = 0
  let at = body.indexOf(NEWLINE)
  while (at !== -1) {
    seen += 1
    at = body.indexOf(NEWLINE, at + 1)
  }
  return body[body.length - 1] === NEWLINE ? seen : seen + 1
}

export function countsIn(root: string): Counts {
  const held = new Map<string, { files: number; lines: number }>()
  const unread: string[] = []
  let files = 0
  let lines = 0
  for (const path of pathsIn(root)) {
    if (madeBy(path)) continue
    let seen = 0
    try {
      seen = linesIn(readFileSync(join(root, path)))
    } catch {
      unread.push(path)
    }
    const type = typeOf(path)
    const one = held.get(type) ?? { files: 0, lines: 0 }
    one.files += 1
    one.lines += seen
    held.set(type, one)
    files += 1
    lines += seen
  }
  const types = [...held].map(([type, one]) => ({ type, files: one.files, lines: one.lines }))
  types.sort((a, b) => b.lines - a.lines || a.type.localeCompare(b.type))
  return { types, files, lines, unread }
}

function widthOf(rows: readonly (readonly string[])[], at: number): number {
  return rows.reduce((most, one) => Math.max(most, (one[at] ?? "").length), 0)
}

function saidAs(rows: readonly (readonly string[])[]): readonly string[] {
  const type = widthOf(rows, 0)
  const files = widthOf(rows, 1)
  const lines = widthOf(rows, 2)
  return rows.map((one) =>
    [
      (one[0] ?? "").padEnd(type),
      (one[1] ?? "").padStart(files),
      (one[2] ?? "").padStart(lines),
    ].join(GAP)
  )
}

export function linesOf(counts: Counts): readonly string[] {
  const total = [TOTAL, String(counts.files), String(counts.lines)]
  const rows = [
    HEADING,
    ...counts.types.map((one) => [one.type, String(one.files), String(one.lines)]),
    total,
  ]
  const said = saidAs(rows)
  const body = [...said.slice(0, -1), "", said[said.length - 1] ?? ""]
  if (counts.unread.length === 0) return body
  return [...body, "", "these were not read, and count no lines:", ...counts.unread]
}
