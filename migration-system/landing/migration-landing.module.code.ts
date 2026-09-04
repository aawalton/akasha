import { existsSync, readdirSync, readFileSync, rmdirSync } from "node:fs"
import { dirname, join, relative, resolve, sep } from "node:path"
import type { Held } from "@akasha/command-system/asking"
import type { Answer } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { landingFor } from "../checked-landing/migration-checked-landing.module.code.ts"

const FILES = 200

const BYTES = 2_000_000

const HALTS = 3

const LANDED = 0

const ENCODER = new TextEncoder()

export type Composed = {
  readonly path: string
  readonly body: string | Uint8Array | null
  readonly together?: string
  readonly was?: string | Uint8Array
}

export type Landing = (
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
  message: string,
  unmoved?: readonly Held[]
) => Promise<Answer>

export type Saying = (line: string) => undefined

export type Migration = {
  readonly calledAs: string
  readonly subject: string
  readonly composed: readonly Composed[]
  readonly files?: number
  readonly bytes?: number
  readonly haltAfter?: number
  readonly landing?: Landing
  readonly saying?: Saying
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
  readonly swept: readonly string[]
  readonly halted: string | null
  readonly code: number
}

export function bodyOf(one: Composed): Uint8Array | null {
  if (one.body === null) return null
  return typeof one.body === "string" ? ENCODER.encode(one.body) : one.body
}

function heldIn(composed: readonly Composed[]): readonly Held[] {
  const said: Held[] = []
  for (const one of composed) {
    if (one.was === undefined) continue
    const bytes = typeof one.was === "string" ? ENCODER.encode(one.was) : one.was
    said.push({ path: one.path, was: bytes })
  }
  return said
}

export function editOf(one: Composed): FileEdit {
  return { path: one.path, body: bodyOf(one) }
}

export function weightOf(one: Composed): number {
  const body = bodyOf(one)
  return body === null ? 0 : body.byteLength
}

export function toStandardError(line: string): undefined {
  process.stderr.write(`${line}\n`)
}

export function emptiedUnder(root: string, paths: readonly string[]): readonly string[] {
  const top = resolve(root)
  const swept: string[] = []
  const seen = new Set<string>()
  for (const path of paths) {
    let at = dirname(resolve(top, path))
    while (at !== top && at.startsWith(`${top}${sep}`)) {
      if (seen.has(at)) break
      seen.add(at)
      if (!existsSync(at)) {
        at = dirname(at)
        continue
      }
      if (readdirSync(at).length > 0) break
      rmdirSync(at)
      swept.push(relative(top, at))
      at = dirname(at)
    }
  }
  return swept
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
  const saying = asked.saying ?? toStandardError
  const mistaken = mistakenIn(asked.composed)
  if (mistaken.length > 0) {
    for (const one of mistaken) saying(`migration ${asked.subject}: ${one}`)
    saying(`migration ${asked.subject}: nothing landed, and every body was left composed`)
    return { landed: [], batches: [], refused: [], mistaken, swept: [], halted: null, code: 1 }
  }
  const landing = asked.landing ?? landingFor(root, asked.composed)
  const halts = asked.haltAfter ?? HALTS
  const batches = batchesOf(asked.composed, asked.files ?? FILES, asked.bytes ?? BYTES)
  const said: Said[] = []
  const refused: Said[] = []
  const landed: string[] = []
  const swept: string[] = []
  let halted: string | null = null
  for (const [index, held] of batches.entries()) {
    const at = index + 1
    const paths = held.map((one) => one.path)
    const message = messageFor(asked.subject, at, batches.length, held.length)
    const batch: Batch = { at, of: batches.length, paths, message }
    const answer = landing(root, asked.calledAs, held.map(editOf), message, heldIn(held))
    const one: Said = { batch, code: answer.code, said: sayingOf(answer) }
    said.push(one)
    if (answer.code === LANDED) {
      landed.push(...paths)
      continue
    }
    refused.push(one)
    const many = `${paths.length} file${paths.length === 1 ? "" : "s"}`
    saying(
      `migration ${asked.subject}: batch ${at} of ${batches.length} was refused answering ${answer.code}, and ${many} did not land`
    )
    for (const line of one.said) saying(`migration ${asked.subject}:   ${line}`)
    for (const gone of emptiedUnder(root, paths)) {
      swept.push(gone)
      saying(`migration ${asked.subject}: ${gone} was left holding nothing and was taken away`)
    }
    if (refused.length < halts) continue
    halted = `${refused.length} of ${batches.length} batches were refused, so the rest of ${asked.subject} was left alone`
    saying(`migration ${asked.subject}: ${halted}`)
    break
  }
  if (refused.length > 0) {
    saying(
      `migration ${asked.subject}: ${landed.length} of ${asked.composed.length} files landed and ${refused.length} of ${batches.length} batches were refused, so this migration is partial`
    )
  }
  return {
    landed,
    batches: said,
    refused,
    mistaken: [],
    swept,
    halted,
    code: refused.length === 0 ? 0 : 1,
  }
}
