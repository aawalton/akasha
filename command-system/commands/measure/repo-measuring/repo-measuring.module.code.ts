import {
  columnsOf,
  linesAt,
  madeBy,
  pathsIn,
} from "../checkout-counting/checkout-counting.module.code.ts"

const TOTAL = "total"

const HEADING: readonly string[] = ["type", "files", "lines"]

const UNREAD = "these were not read, and count no lines:"

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

export function typeOf(path: string): string {
  const name = path.slice(path.lastIndexOf("/") + 1)
  const at = name.lastIndexOf(".")
  return at < 1 ? name : name.slice(at + 1)
}

export function countsIn(root: string): Counts {
  const held = new Map<string, { files: number; lines: number }>()
  const unread: string[] = []
  let files = 0
  let lines = 0
  for (const path of pathsIn(root)) {
    if (madeBy(path)) continue
    const found = linesAt(root, path)
    if (found === null) unread.push(path)
    const seen = found ?? 0
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

export function linesOf(counts: Counts): readonly string[] {
  const said = columnsOf([
    HEADING,
    ...counts.types.map((one) => [one.type, String(one.files), String(one.lines)]),
    [TOTAL, String(counts.files), String(counts.lines)],
  ])
  const body = [...said.slice(0, -1), "", said[said.length - 1] ?? ""]
  if (counts.unread.length === 0) return body
  return [...body, "", UNREAD, ...counts.unread]
}
