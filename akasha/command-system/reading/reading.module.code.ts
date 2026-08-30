import { createHash } from "node:crypto"
import {
  fstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"

export const READS_AT = ".git/data/reads"

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
  readonly mechanicalOid: string | null
}

export type Carry = {
  readonly was: string
  readonly now: string
  readonly from: string
}

export type Discard = "/dev/null" | "a pipe" | "a file only this redirect opened"

export type Opening = {
  readonly dev: number
  readonly ino: number
  readonly isFIFO: () => boolean
  readonly isFile: () => boolean
}

export function blobIdOf(bytes: Uint8Array): string {
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex")
}

export function readingFileAt(root: string, agentId: string, path: string): string {
  return join(root, READS_AT, "agent", "id", agentId, "path", `${path}.jsonl`)
}

function readingOf(value: unknown): Reading | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const { path, oid, seenAt, mechanicalOid } = value as {
    path?: unknown
    oid?: unknown
    seenAt?: unknown
    mechanicalOid?: unknown
  }
  if (typeof path !== "string" || path === "") return null
  if (typeof oid !== "string" || oid === "") return null
  if (typeof seenAt !== "number" || !Number.isFinite(seenAt)) return null
  const left = typeof mechanicalOid === "string" && mechanicalOid !== "" ? mechanicalOid : null
  return { path, oid, seenAt, mechanicalOid: left }
}

export function readingIn(root: string, agentId: string, path: string): Reading | null {
  let raw: string
  try {
    raw = readFileSync(readingFileAt(root, agentId, path), "utf8")
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

export function recordRead(root: string, agentId: string, held: Reading): undefined {
  const at = readingFileAt(root, agentId, held.path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(held)}\n`)
}

export function sameBody(held: Reading | null, oid: string): boolean {
  return held !== null && (held.oid === oid || held.mechanicalOid === oid)
}

export function carriedInto(held: Reading, carry: Carry, to: string): Reading | null {
  if ((held.mechanicalOid ?? held.oid) !== carry.from) return null
  return { path: carry.now, oid: held.oid, seenAt: held.seenAt, mechanicalOid: to }
}

export function agentIdsIn(root: string): readonly string[] {
  let found: readonly string[]
  try {
    found = readdirSync(join(root, READS_AT, "agent", "id"), { withFileTypes: true })
      .filter((one) => one.isDirectory())
      .map((one) => one.name)
  } catch {
    return []
  }
  return [...found].sort()
}

export function carryReadings(root: string, carries: readonly Carry[]): undefined {
  const agentIds = agentIdsIn(root)
  for (const carry of carries) {
    let to: string
    try {
      to = blobIdOf(readFileSync(join(root, carry.now)))
    } catch {
      continue
    }
    for (const agentId of agentIds) {
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
  const agentIds = agentIdsIn(root)
  for (const path of paths) {
    for (const agentId of agentIds) {
      try {
        rmSync(readingFileAt(root, agentId, path), { force: true })
      } catch {}
    }
  }
}

function same(one: Opening, other: Opening): boolean {
  return one.dev === other.dev && one.ino === other.ino
}

export function discardedBy(out: Opening, said: Opening, nowhere: Opening): Discard | null {
  if (same(out, nowhere)) return "/dev/null"
  if (out.isFIFO()) return "a pipe"
  if (!out.isFile()) return null
  return said.isFile() && same(out, said) ? null : "a file only this redirect opened"
}

export function discarded(): Discard | null {
  try {
    return discardedBy(fstatSync(1), fstatSync(2), statSync("/dev/null"))
  } catch {
    return null
  }
}
