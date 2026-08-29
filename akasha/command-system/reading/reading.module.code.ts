import { createHash } from "node:crypto"
import { fstatSync, mkdirSync, readFileSync, type Stats, statSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

export const READS_AT = ".git/data/reads"

export type Reading = {
  readonly path: string
  readonly oid: string
  readonly seenAt: number
}

export type Discard = "/dev/null" | "a pipe" | "a file only this redirect opened"

export function blobIdOf(bytes: Uint8Array): string {
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex")
}

export function readingFileAt(root: string, agentId: string, path: string): string {
  return join(root, READS_AT, "agent", "id", agentId, "path", `${path}.jsonl`)
}

function readingOf(value: unknown): Reading | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const { path, oid, seenAt } = value as {
    path?: unknown
    oid?: unknown
    seenAt?: unknown
  }
  if (typeof path !== "string" || path === "") return null
  if (typeof oid !== "string" || oid === "") return null
  if (typeof seenAt !== "number" || !Number.isFinite(seenAt)) return null
  return { path, oid, seenAt }
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

export function recordRead(root: string, agentId: string, held: Reading): void {
  const at = readingFileAt(root, agentId, held.path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `${JSON.stringify(held)}\n`)
}

function same(one: Stats, other: Stats): boolean {
  return one.dev === other.dev && one.ino === other.ino
}

export function discardedBy(out: Stats, said: Stats, nowhere: Stats): Discard | null {
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
