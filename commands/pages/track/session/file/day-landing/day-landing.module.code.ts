import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  type Held,
  linesOf,
  type Row,
} from "../../../../../modules/session-rows/session-rows.module.code.ts"

export type Landing = { readonly held: Held; readonly rows: Row[] }

const DECLARED = '  sessions: "jsonl",'

const CLOSING = "} as const satisfies"

export function withSessionsDeclared(said: string): string {
  if (/^\s*sessions:/m.test(said)) return said
  const at = said.lastIndexOf(CLOSING)
  if (at < 0) return said
  return `${said.slice(0, at)}${DECLARED}\n${said.slice(at)}`
}

export function pathUnder(root: string, path: string): string {
  return path.startsWith(root) ? path.slice(root.length).replace(/^\//, "") : path
}

export function besideArgv(
  landings: readonly Landing[],
  scratch: string,
  root: string
): readonly string[] {
  const argv: string[] = []
  for (const [index, one] of landings.entries()) {
    const declared = withSessionsDeclared(one.held.pageSaid)
    if (declared === one.held.pageSaid) continue
    const beside = join(scratch, `page-${String(index)}`)
    writeFileSync(beside, declared)
    argv.push("--file-path", pathUnder(root, one.held.pageAt), "--content-file", beside)
  }
  for (const [index, one] of landings.slice(0, -1).entries()) {
    const beside = join(scratch, `day-${String(index)}`)
    writeFileSync(beside, linesOf(one.rows))
    argv.push("--file-path", pathUnder(root, one.held.path), "--content-file", beside)
  }
  return argv
}
