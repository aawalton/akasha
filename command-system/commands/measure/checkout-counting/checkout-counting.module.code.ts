import { readFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitSaid } from "@akasha/git/git-running"

const PARTED_BY = "\0"

const LISTED: readonly string[] = ["ls-files", "-z", "--cached", "--others", "--exclude-standard"]

const NEWLINE = 10

const MADE_IN: readonly string[] = ["generated", "build", "dist", "out", "coverage"]

const MADE_NAME = /\.generated\.[^.]+$/

const GAP = "  "

export function pathsIn(root: string): readonly string[] {
  const said = gitSaid(root, LISTED)
  return [...new Set(said.split(PARTED_BY).filter((one) => one !== ""))]
}

export function madeBy(path: string): boolean {
  const parts = path.split("/")
  const name = parts[parts.length - 1] ?? ""
  if (parts.slice(0, -1).some((one) => MADE_IN.includes(one))) return true
  return MADE_NAME.test(name)
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

export function linesAt(root: string, path: string): number | null {
  try {
    return linesIn(readFileSync(join(root, path)))
  } catch {
    return null
  }
}

export function widthsOf(rows: readonly (readonly string[])[]): readonly number[] {
  const wide = rows.reduce((most, one) => Math.max(most, one.length), 0)
  const found: number[] = []
  for (let at = 0; at < wide; at += 1) {
    found.push(rows.reduce((most, one) => Math.max(most, (one[at] ?? "").length), 0))
  }
  return found
}

export function columnsOf(rows: readonly (readonly string[])[]): readonly string[] {
  const widths = widthsOf(rows)
  return rows.map((one) =>
    one
      .map((said, at) => (at === 0 ? said.padEnd(widths[at] ?? 0) : said.padStart(widths[at] ?? 0)))
      .join(GAP)
      .trimEnd()
  )
}
