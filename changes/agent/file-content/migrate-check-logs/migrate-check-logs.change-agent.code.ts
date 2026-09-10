import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { uncommittedPartAt, uncommittedPartsOf } from "@akasha/pages/page-file-parts"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { carryingOver } from "../../../modules/value-carrying/value-carrying.module.code.ts"

const ADD_FILE_OF_ANY_KIND = "change-mechanical/add-file-of-any-kind"

const CODE_CHECK = "code-check"

const ENTRIES = "entries"

const LOGS = "logs"

const HELD = "jsonl"

const CHECK = "check"

const AUDIT = "audit"

const GROUPS = [CHECK, AUDIT] as const

const SINCE = "since"

const FIRST_PART = 1

const SHOWN = 60

const NO_ROW = "no check recorded a run on or after that day, so no log is written"

const NO_OBJECT = "a line that is no run recorded as one object"

export type Row = {
  readonly ranAt: string
  readonly audit: boolean
  readonly line: string
}

export type Split = { readonly check: readonly Row[]; readonly audit: readonly Row[] }

function objectIn(line: string): Record<string, unknown> | null {
  try {
    const held: unknown = JSON.parse(line)
    if (typeof held !== "object" || held === null) return null
    return held as Record<string, unknown>
  } catch {
    return null
  }
}

function rowIn(line: string): Row | null {
  const held = objectIn(line)
  if (held === null) return null
  const ranAt = held.ranAt
  if (typeof ranAt !== "string") return null
  return { ranAt, audit: held.phase === AUDIT, line }
}

export function rowsIn(text: string, since: string): readonly Row[] | string {
  const found: Row[] = []
  for (const line of text.split("\n")) {
    if (line === "") continue
    const row = rowIn(line)
    if (row === null) return `${NO_OBJECT}: \`${line.slice(0, SHOWN)}\``
    if (row.ranAt < since) continue
    found.push(row)
  }
  return found
}

function byRanAt(one: Row, two: Row): number {
  if (one.ranAt < two.ranAt) return -1
  return one.ranAt > two.ranAt ? 1 : 0
}

function uniqueIn(rows: readonly Row[]): readonly Row[] {
  const seen = new Set<string>()
  const found: Row[] = []
  for (const one of rows) {
    if (seen.has(one.line)) continue
    seen.add(one.line)
    found.push(one)
  }
  return found
}

export function bodyOver(rows: readonly Row[], already: readonly Row[]): string {
  const sorted = [...uniqueIn([...already, ...rows])].sort(byRanAt)
  const lines = sorted.map((one) => one.line)
  return `${lines.join("\n")}\n`
}

function textAt(root: string, at: string): string | null {
  const path = join(root, at)
  return existsSync(path) ? readFileSync(path, "utf8") : null
}

export function splitFor(root: string, page: string, since: string): Split | string {
  const check: Row[] = []
  const audit: Row[] = []
  const existing = (one: string): boolean => existsSync(join(root, one))
  for (const at of uncommittedPartsOf(page, ENTRIES, HELD, existing)) {
    const text = textAt(root, at)
    if (text === null) continue
    const rows = rowsIn(text, since)
    if (typeof rows === "string") return `\`${at}\` has ${rows}`
    for (const row of rows) {
      if (row.audit) audit.push(row)
      else check.push(row)
    }
  }
  return { check, audit }
}

export async function migrateCheckLogs(world: World, since: string): Promise<Answer> {
  const carrier = carryingOver(world)
  let written = 0
  for (const one of world.index.everyOfType(CODE_CHECK)) {
    const split = splitFor(world.root, one.path, since)
    if (typeof split === "string") return refusing(split)
    for (const group of GROUPS) {
      const rows = group === AUDIT ? split.audit : split.check
      const at = uncommittedPartAt(one.path, `${group}.${LOGS}`, HELD, FIRST_PART)
      if (at === null || rows.length === 0) continue
      const held = textAt(world.root, at)
      const already = held === null ? [] : rowsIn(held, "")
      if (typeof already === "string") return refusing(`\`${at}\` has ${already}`)
      const body = bodyOver(rows, already)
      if (body === held) continue
      const why = await carrier.reaching(ADD_FILE_OF_ANY_KIND, { at, body })
      if (why !== null) return refusing(`${why}. \`${at}\` is the log, and no log here is written`)
      written += 1
    }
  }
  if (written === 0) return refusing(NO_ROW)
  return carrier.gatheredIn()
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const since = given[SINCE]
  if (since === undefined) return refusing(missing(SINCE))
  return await migrateCheckLogs(world, since)
}
