import { createHash } from "node:crypto"
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { reads } from "akasha/agent/properties/reads.file-property.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
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

export type Owner = {
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

function parseReading(value: unknown): Reading | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const held = value as {
    path?: unknown
    oid?: unknown
    seenAt?: unknown
    carriedOid?: unknown
    mechanicalOid?: unknown
    readThrough?: unknown
  }
  const { path, oid, seenAt, readThrough } = held
  if (typeof path !== "string" || path === "") return null
  if (typeof oid !== "string" || oid === "") return null
  if (typeof seenAt !== "number" || !Number.isFinite(seenAt)) return null
  const said = held.carriedOid ?? held.mechanicalOid
  const left = typeof said === "string" && said !== "" ? said : null
  return withReach({ path, oid, seenAt, carriedOid: left }, reachOf(readThrough))
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

function lastOf(every: readonly Reading[], path: string): Reading | null {
  let found: Reading | null = null
  for (const one of every) if (one.path === path) found = one
  return found
}

export function readingIn(root: string, agentId: string, path: string): Reading | null {
  return lastOf(readingsAt(readsFileAt(root, agentId)), path)
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

function keptIn(at: string, kept: (one: Reading) => boolean): number {
  const every = linesAt(at)
  if (every.length === 0) return 0
  const left: Reading[] = []
  for (const line of every) {
    const held = lineOf(line)
    if (held !== null && kept(held)) left.push(held)
  }
  const went = every.length - left.length
  if (went === 0) return 0
  exclusively(at, (): undefined => {
    writeFileSync(at, left.map((one) => `${JSON.stringify(one)}\n`).join(""))
    return undefined
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
