import { createHash } from "node:crypto"
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { reads } from "akasha/agent/properties/reads.file-property.ts"
import { exclusively, writtenOver } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const SEAT = "seat"

const SUBAGENT = "subagent"

const AGENT_ID = "agentId"

const OWN_ID = "id"

export const SUBAGENT_MARK = "--"

export const SEAT_NAMED = "AGENT_ID"

export const ACTING_NAMED = "ACTING_AGENT_ID"

function named(env: Readonly<Record<string, string | undefined>>, one: string): string | null {
  const said = env[one]
  return said === undefined || said === "" ? null : said
}

export function seatIn(env: Readonly<Record<string, string | undefined>>): string | null {
  return named(env, SEAT_NAMED)
}

export function writerIn(env: Readonly<Record<string, string | undefined>>): string | null {
  const seat = seatIn(env)
  if (seat === null) return null
  const acting = named(env, ACTING_NAMED)
  return acting?.startsWith(`${seat}${SUBAGENT_MARK}`) === true ? acting : seat
}

export type Reading = {
  readonly path: string
  readonly oid: string
  readonly seenAt: number
  readonly carriedOid: string | null
  readonly readThrough?: number | null
  readonly linesShown?: readonly number[]
  readonly changedAt?: number
}

export type Sighting = {
  readonly path: string
  readonly oid: string
  readonly seenAt: number
  readonly linesShown: readonly number[]
}

export type Carry = {
  readonly was: string
  readonly now: string
  readonly from: string
}

export function blobIdOf(bytes: Uint8Array): string {
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex")
}

const HELD = "jsonl"

export function readsBesideAt(page: string): string | null {
  return uncommittedBesideAt(page, reads.propertySlug, HELD)
}

type Owner = {
  readonly agentId: string
  readonly at: string
}

function saidIn(value: unknown, key: string): string | null {
  if (value === null || typeof value !== "object") return null
  const said = (value as Record<string, unknown>)[key]
  return typeof said === "string" && said !== "" ? said : null
}

function pagesOfAgents(root: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of valuesOfType(root, SEAT)) {
    const said = saidIn(one.value, OWN_ID)
    if (said !== null) found.set(said, one.path)
  }
  for (const one of valuesOfType(root, SUBAGENT)) {
    const said = saidIn(one.value, AGENT_ID)
    if (said !== null) found.set(said, one.path)
  }
  return found
}

function besideIn(root: string, agentId: string): string | null {
  const page = pagesOfAgents(root).get(agentId)
  return page === undefined ? null : readsBesideAt(page)
}

export function readsFileAt(root: string, agentId: string): string | null {
  const held = besideIn(root, agentId)
  return held === null ? null : join(root, held)
}

function everyOwner(root: string): readonly Owner[] {
  const found: Owner[] = []
  for (const agentId of pagesOfAgents(root).keys()) {
    const at = readsFileAt(root, agentId)
    if (at !== null) found.push({ agentId, at })
  }
  return found
}

export function reachOf(said: unknown): number | null {
  return typeof said === "number" && Number.isInteger(said) && said > 0 ? said : null
}

export function partly(held: Reading | null): boolean {
  return held !== null && reachOf(held.readThrough) !== null
}

function withReach(said: Reading, through: number | null): Reading {
  return through === null ? said : { ...said, readThrough: through }
}

function shownOf(said: unknown): readonly number[] | null {
  if (!Array.isArray(said) || said.length === 0) return null
  return said.every((one) => reachOf(one) !== null) ? (said as readonly number[]) : null
}

function sighted(held: Reading): boolean {
  return held.linesShown !== undefined
}

function markedChanged(held: Reading): boolean {
  return held.changedAt !== undefined
}

export function parseReading(value: unknown): Reading | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const held = value as {
    path?: unknown
    oid?: unknown
    seenAt?: unknown
    carriedOid?: unknown
    readThrough?: unknown
    linesShown?: unknown
    changedAt?: unknown
  }
  const { path, oid, seenAt, carriedOid, readThrough } = held
  if (typeof path !== "string" || path === "") return null
  if (typeof oid !== "string" || oid === "") return null
  if (typeof seenAt !== "number" || !Number.isFinite(seenAt)) return null
  const left = typeof carriedOid === "string" && carriedOid !== "" ? carriedOid : null
  const said = withReach({ path, oid, seenAt, carriedOid: left }, reachOf(readThrough))
  if ("changedAt" in held) {
    const { changedAt } = held
    if (typeof changedAt !== "number" || !Number.isFinite(changedAt)) return null
    return "linesShown" in held ? null : { ...said, changedAt }
  }
  if (!("linesShown" in held)) return said
  const shown = shownOf(held.linesShown)
  return shown === null ? null : { ...said, linesShown: shown }
}

function lineOf(line: string): Reading | null {
  if (line.trim() === "") return null
  try {
    return parseReading(JSON.parse(line))
  } catch {
    return null
  }
}

function linesAt(at: string | null): readonly string[] {
  if (at === null) return []
  let raw: string
  try {
    raw = readFileSync(at, "utf8")
  } catch {
    return []
  }
  return raw.split("\n").filter((one) => one.trim() !== "")
}

function readingsAt(at: string | null): readonly Reading[] {
  const found: Reading[] = []
  for (const line of linesAt(at)) {
    const held = lineOf(line)
    if (held !== null) found.push(held)
  }
  return found
}

function bodyOf(left: readonly Reading[]): string {
  return left.map((one) => `${JSON.stringify(one)}\n`).join("")
}

export function lastOf(every: readonly Reading[], path: string): Reading | null {
  let found: Reading | null = null
  for (const one of every) {
    if (one.path === path && !sighted(one) && !markedChanged(one)) found = one
  }
  return found
}

export function readingIn(root: string, agentId: string, path: string): Reading | null {
  return lastOf(readingsAt(readsFileAt(root, agentId)), path)
}

export function lastSeenIn(root: string, agentId: string): ReadonlyMap<string, Reading> {
  const found = new Map<string, Reading>()
  for (const one of readingsAt(readsFileAt(root, agentId))) {
    if (!sighted(one)) found.set(one.path, one)
  }
  return found
}

export function recordRead(root: string, agentId: string, held: Reading): undefined {
  const beside = besideIn(root, agentId)
  if (beside === null) return undefined
  const at = join(root, beside)
  mkdirSync(dirname(at), { recursive: true })
  exclusively(at, (): undefined => {
    appendFileSync(at, `${JSON.stringify(held)}\n`)
    return undefined
  })
  return undefined
}

export function recordSightings(
  root: string,
  agentId: string,
  every: readonly Sighting[]
): undefined {
  const beside = besideIn(root, agentId)
  if (beside === null || every.length === 0) return undefined
  const at = join(root, beside)
  mkdirSync(dirname(at), { recursive: true })
  const lines = every.map((one) => `${JSON.stringify({ ...one, carriedOid: null })}\n`)
  exclusively(at, (): undefined => {
    appendFileSync(at, lines.join(""))
    return undefined
  })
  return undefined
}

type Left = {
  readonly left: readonly Reading[]
  readonly went: number
}

function leftOf(every: readonly string[], kept: (one: Reading) => boolean): Left {
  const left: Reading[] = []
  for (const line of every) {
    const held = lineOf(line)
    if (held !== null && kept(held)) left.push(held)
  }
  return { left, went: every.length - left.length }
}

function keptIn(at: string, kept: (one: Reading) => boolean): number {
  if (leftOf(linesAt(at), kept).went === 0) return 0
  let went = 0
  writtenOver(at, () => {
    const held = leftOf(linesAt(at), kept)
    went = held.went
    return went === 0 ? null : bodyOf(held.left)
  })
  return went
}

export function sameBody(held: Reading | null, oid: string): boolean {
  if (held === null || partly(held)) return false
  return held.oid === oid || held.carriedOid === oid
}

export function carriedInto(held: Reading, carry: Carry, to: string): Reading | null {
  if ((held.carriedOid ?? held.oid) !== carry.from) return null
  const said = { path: carry.now, oid: held.oid, seenAt: held.seenAt, carriedOid: to }
  return withReach(said, reachOf(held.readThrough))
}

export function carryReadings(root: string, carries: readonly Carry[]): undefined {
  const every = everyOwner(root)
  for (const carry of carries) {
    let to: string
    try {
      to = blobIdOf(readFileSync(join(root, carry.now)))
    } catch {
      continue
    }
    for (const one of every) {
      const held = lastOf(readingsAt(one.at), carry.was)
      if (held === null) continue
      const carried = carriedInto(held, carry, to)
      if (carried === null) continue
      try {
        if (carry.now !== carry.was) keptIn(one.at, (was) => was.path !== carry.was)
        recordRead(root, one.agentId, carried)
      } catch {}
    }
  }
}

export function dropReadings(root: string, paths: readonly string[]): undefined {
  const gone = new Set(paths)
  for (const one of everyOwner(root)) {
    try {
      keptIn(one.at, (held) => !gone.has(held.path))
    } catch {}
  }
}

function markedOf(
  every: readonly Reading[],
  changed: ReadonlySet<string>,
  when: number
): readonly Reading[] | null {
  if (!every.some((one) => changed.has(one.path))) return null
  const last = new Map<string, Reading>()
  for (const one of every) if (changed.has(one.path) && !sighted(one)) last.set(one.path, one)
  const left = every.filter((one) => !changed.has(one.path))
  for (const one of last.values()) left.push(markedChanged(one) ? one : { ...one, changedAt: when })
  return left
}

function markedIn(at: string, changed: ReadonlySet<string>, when: number): undefined {
  if (markedOf(readingsAt(at), changed, when) === null) return undefined
  writtenOver(at, () => {
    const left = markedOf(readingsAt(at), changed, when)
    return left === null ? null : bodyOf(left)
  })
  return undefined
}

export function markReadingsChanged(
  root: string,
  paths: readonly string[],
  when: number = Date.now()
): undefined {
  if (paths.length === 0) return undefined
  const changed = new Set(paths)
  for (const one of everyOwner(root)) {
    try {
      markedIn(one.at, changed, when)
    } catch {}
  }
  return undefined
}

export function readingsDropped(root: string, page: string): undefined {
  const at = readsBesideAt(page)
  if (at === null) return undefined
  const full = join(root, at)
  if (!existsSync(full)) return undefined
  exclusively(full, (): undefined => {
    rmSync(full, { force: true })
    return undefined
  })
  return undefined
}

export type Swept = {
  readonly agent: number
  readonly stale: number
}

export function sweptReadings(root: string, agentId: string | null, before: number): Swept {
  const own = agentId === null || agentId === "" ? null : agentId
  let agent = 0
  let stale = 0
  for (const one of everyOwner(root)) {
    try {
      if (own !== null && one.agentId === own) {
        agent += keptIn(one.at, () => false)
        continue
      }
      stale += keptIn(one.at, (held) => held.seenAt >= before)
    } catch {}
  }
  return { agent, stale }
}
