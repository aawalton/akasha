import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import type { Answer } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"

const FILES = 200

const BYTES = 2_000_000

const HALTS = 3

const LANDED = 0

const ENCODER = new TextEncoder()

export type Composed = {
  readonly path: string
  readonly body: string | Uint8Array | null
  readonly together?: string
}

export type Landing = (
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
  message: string
) => Answer

export type Migration = {
  readonly calledAs: string
  readonly subject: string
  readonly composed: readonly Composed[]
  readonly files?: number
  readonly bytes?: number
  readonly haltAfter?: number
  readonly landing?: Landing
}

export type Batch = {
  readonly at: number
  readonly of: number
  readonly paths: readonly string[]
  readonly message: string
}

export type Said = {
  readonly batch: Batch
  readonly code: number
  readonly said: readonly string[]
}

export type Migrated = {
  readonly landed: readonly string[]
  readonly batches: readonly Said[]
  readonly refused: readonly Said[]
  readonly mistaken: readonly string[]
  readonly halted: string | null
  readonly code: number
}

export function bodyOf(one: Composed): Uint8Array | null {
  if (one.body === null) return null
  return typeof one.body === "string" ? ENCODER.encode(one.body) : one.body
}

export function editOf(one: Composed): FileEdit {
  return { path: one.path, body: bodyOf(one) }
}

export function weightOf(one: Composed): number {
  const body = bodyOf(one)
  return body === null ? 0 : body.byteLength
}

export function mistakenIn(composed: readonly Composed[]): readonly string[] {
  const said: string[] = []
  const seen = new Set<string>()
  for (const one of composed) {
    if (one.path === "") {
      said.push("a change naming no path is no change")
      continue
    }
    if (one.path.startsWith("/")) {
      said.push(`${one.path} is an absolute path, and a change names a path under the root`)
      continue
    }
    if (seen.has(one.path)) {
      said.push(`${one.path} is composed twice, and one landing writes a path once`)
      continue
    }
    seen.add(one.path)
  }
  return said
}

export function unitsOf(composed: readonly Composed[]): readonly (readonly Composed[])[] {
  const held = new Map<string, Composed[]>()
  const order: string[] = []
  for (const one of composed) {
    const key = one.together === undefined ? `�${one.path}` : `together:${one.together}`
    const found = held.get(key)
    if (found === undefined) {
      held.set(key, [one])
      order.push(key)
      continue
    }
    found.push(one)
  }
  return order.map((key) => held.get(key) ?? [])
}

export function batchesOf(
  composed: readonly Composed[],
  files: number,
  bytes: number
): readonly (readonly Composed[])[] {
  const batches: Composed[][] = []
  let held: Composed[] = []
  let weight = 0
  for (const unit of unitsOf(composed)) {
    const heavy = unit.reduce((sum, one) => sum + weightOf(one), 0)
    const overFiles = held.length > 0 && held.length + unit.length > files
    const overBytes = held.length > 0 && weight + heavy > bytes
    if (overFiles || overBytes) {
      batches.push(held)
      held = []
      weight = 0
    }
    held.push(...unit)
    weight += heavy
  }
  if (held.length > 0) batches.push(held)
  return batches
}

export function messageFor(subject: string, at: number, of: number, many: number): string {
  const counted = `${many} file${many === 1 ? "" : "s"}`
  const where = of === 1 ? "" : ` (batch ${at} of ${of})`
  return `migration: ${subject} — ${counted}${where}`
}

export function sayingOf(answer: Answer): readonly string[] {
  const said = [...answer.refusals, ...answer.report].filter((one) => one.trim() !== "")
  return said.length > 0 ? said : [`the landing answered ${answer.code} and said nothing`]
}

export type ReadBack = {
  readonly matched: readonly string[]
  readonly moved: readonly string[]
  readonly missing: readonly string[]
  readonly lingering: readonly string[]
}

function sameBytes(one: Uint8Array, two: Uint8Array): boolean {
  return Buffer.from(one).equals(Buffer.from(two))
}

export function readBack(root: string, composed: readonly Composed[]): ReadBack {
  const matched: string[] = []
  const moved: string[] = []
  const missing: string[] = []
  const lingering: string[] = []
  for (const one of composed) {
    const at = join(root, one.path)
    const there = existsSync(at)
    const body = bodyOf(one)
    if (body === null) {
      if (there) lingering.push(one.path)
      continue
    }
    if (!there) {
      missing.push(one.path)
      continue
    }
    if (sameBytes(readFileSync(at), body)) matched.push(one.path)
    else moved.push(one.path)
  }
  return { matched, moved, missing, lingering }
}

export function migrationLanded(root: string, asked: Migration): Migrated {
  const mistaken = mistakenIn(asked.composed)
  if (mistaken.length > 0) {
    return { landed: [], batches: [], refused: [], mistaken, halted: null, code: 1 }
  }
  const landing = asked.landing ?? landedMechanically
  const halts = asked.haltAfter ?? HALTS
  const batches = batchesOf(asked.composed, asked.files ?? FILES, asked.bytes ?? BYTES)
  const said: Said[] = []
  const refused: Said[] = []
  const landed: string[] = []
  let running = 0
  let halted: string | null = null
  for (const [index, held] of batches.entries()) {
    const at = index + 1
    const paths = held.map((one) => one.path)
    const message = messageFor(asked.subject, at, batches.length, held.length)
    const batch: Batch = { at, of: batches.length, paths, message }
    const answer = landing(root, asked.calledAs, held.map(editOf), message)
    const one: Said = { batch, code: answer.code, said: sayingOf(answer) }
    said.push(one)
    if (answer.code === LANDED) {
      landed.push(...paths)
      running = 0
      continue
    }
    refused.push(one)
    running += 1
    if (running < halts) continue
    halted = `${running} batches in a row were refused, so the rest of ${asked.subject} was left alone`
    break
  }
  return {
    landed,
    batches: said,
    refused,
    mistaken: [],
    halted,
    code: refused.length === 0 ? 0 : 1,
  }
}
