import { createHash } from "node:crypto"
import { type Dirent, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { dataAt } from "akasha/files/git-place/git-place.module.code.ts"

export const READS_AT = dataAt("reads")

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

export const ENDING = ".jsonl"

export function readsAt(root: string): string {
  return join(root, READS_AT, "path")
}

export function readersAt(root: string, path: string): string {
  return join(readsAt(root), path, "agent", "id")
}

export function readingFileAt(root: string, agentId: string, path: string): string {
  return join(readersAt(root, path), `${agentId}${ENDING}`)
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

function readingOf(value: unknown): Reading | null {
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

export function readingAt(at: string): Reading | null {
  let raw: string
  try {
    raw = readFileSync(at, "utf8")
  } catch {
    return null
  }
  const first = raw.split("\n")[0] ?? ""
  if (first.trim() === "") return null
  try {
    return readingOf(JSON.parse(first) as unknown)
  } catch {
    return null
  }
}

export function readingIn(root: string, agentId: string, path: string): Reading | null {
  return readingAt(readingFileAt(root, agentId, path))
}

export function recordRead(root: string, agentId: string, held: Reading): undefined {
  const at = readingFileAt(root, agentId, held.path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(held)}\n`)
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

export function agentIdsOf(root: string, path: string): readonly string[] {
  let found: readonly string[]
  try {
    found = readdirSync(readersAt(root, path), { withFileTypes: true })
      .filter((one) => one.isFile() && one.name.endsWith(ENDING))
      .map((one) => one.name.slice(0, -ENDING.length))
  } catch {
    return []
  }
  return [...found].sort()
}

export function carryReadings(root: string, carries: readonly Carry[]): undefined {
  for (const carry of carries) {
    let to: string
    try {
      to = blobIdOf(readFileSync(join(root, carry.now)))
    } catch {
      continue
    }
    for (const agentId of agentIdsOf(root, carry.was)) {
      const held = readingIn(root, agentId, carry.was)
      if (held === null) continue
      const carried = carriedInto(held, carry, to)
      if (carried === null) continue
      try {
        recordRead(root, agentId, carried)
        if (carry.now !== carry.was) {
          rmSync(readingFileAt(root, agentId, carry.was), { force: true })
        }
      } catch {}
    }
  }
}

export function dropReadings(root: string, paths: readonly string[]): undefined {
  for (const path of paths) {
    try {
      rmSync(join(readsAt(root), path), { recursive: true, force: true })
    } catch {}
  }
}

export type Swept = {
  readonly agent: number
  readonly stale: number
}

function sweeping(at: string, gone: (file: string, name: string) => boolean): boolean {
  let held: readonly Dirent[]
  try {
    held = readdirSync(at, { withFileTypes: true })
  } catch {
    return false
  }
  let left = false
  for (const one of held) {
    const next = join(at, one.name)
    try {
      if (one.isDirectory()) {
        if (sweeping(next, gone)) left = true
        else rmSync(next, { recursive: true, force: true })
      } else if (gone(next, one.name)) {
        rmSync(next, { force: true })
      } else {
        left = true
      }
    } catch {
      left = true
    }
  }
  return left
}

export function sweptReadings(root: string, agentId: string | null, before: number): Swept {
  const own = agentId === null || agentId === "" ? null : `${agentId}${ENDING}`
  let agent = 0
  let stale = 0
  sweeping(readsAt(root), (at, name) => {
    if (own !== null && name === own) {
      agent += 1
      return true
    }
    const held = readingAt(at)
    if (held !== null && held.seenAt >= before) return false
    stale += 1
    return true
  })
  return { agent, stale }
}
