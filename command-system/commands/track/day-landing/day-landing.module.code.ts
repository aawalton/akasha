import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { type Held, linesOf, type Row } from "../session-rows/session-rows.module.code.ts"

export type Landing = { readonly held: Held; readonly rows: Row[] }

const DECLARED = '  sessions: "jsonl",'

const CLOSING = "} as const satisfies"

/**
 * A day page's body with the stretches beside that day declared, or the body unchanged.
 *
 * A stretch is a row in a file beside the day page rather than a page of its own, and a reader
 * reaches such a row through the `jsonl` the day page declares. A day carrying rows and declaring
 * no stretches reads as a day nothing was ever tracked on, so the safety, the capacity, the sleep,
 * the surplus and the charisma each read as no signal while the rows sit on disk beside the page.
 *
 * A day page states this once. A day page already declaring the stretches is handed back
 * unchanged, so landing a second row rewrites nothing.
 */
export function withSessionsDeclared(said: string): string {
  if (/^\s*sessions:/m.test(said)) return said
  const at = said.lastIndexOf(CLOSING)
  if (at < 0) return said
  return `${said.slice(0, at)}${DECLARED}\n${said.slice(at)}`
}

export function pathUnder(root: string, path: string): string {
  return path.startsWith(root) ? path.slice(root.length).replace(/^\//, "") : path
}

/**
 * The paths and bodies a landing writes beside the day the landing's own rows go to.
 *
 * The rows of the last day are handed to the write as the body, so those rows are left out here.
 * A day page owed the stretches declaration is written whether that day is the last or not,
 * because what the declaration is owed to is the first row landing on a day.
 */
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
