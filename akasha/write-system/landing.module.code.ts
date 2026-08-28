import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import type { Corpus } from "./corpus.module.code.ts"
import { closureFor } from "./corpus.module.code.ts"
import type { Oid, Record_ } from "./reading.module.code.ts"
import { oidOf } from "./reading.module.code.ts"

declare const witnessed: unique symbol

export type Landing = {
  readonly [witnessed]: true
  readonly kind: "write"
  readonly path: string
  readonly prior: Oid | null
  readonly body: string
  readonly by: string
  readonly at: number
}

export type Removal = {
  readonly [witnessed]: true
  readonly kind: "remove"
  readonly path: string
  readonly by: string
  readonly at: number
}

export type Change = Landing | Removal

export type Refusal = { readonly refused: string }

export type Indexing = {
  readonly wrote: (path: string, body: string) => void
  readonly took: (path: string) => void
  readonly settle: () => void
}

export type Held = {
  readonly corpus: Corpus
  readonly record: Record_
  readonly writer: string
  readonly slugOf: (path: string) => string | null
  readonly index: Indexing
}

function refusal(said: string): Refusal {
  return { refused: said }
}

function witnessWrite(path: string, prior: Oid | null, body: string, held: Held): Landing {
  return {
    kind: "write",
    path,
    prior,
    body,
    by: held.writer,
    at: Date.now(),
  } as unknown as Landing
}

export function refused(one: Change | Refusal): one is Refusal {
  return "refused" in one
}

const cleared = new WeakMap<Record_, ReadonlySet<string>>()

function seatShort(held: Held, owed: readonly string[]): readonly string[] {
  const already = cleared.get(held.record)
  const short: string[] = []
  for (const slug of owed) {
    if (already?.has(slug) === true) continue
    const at = held.corpus.at(slug)
    if (at === null) continue
    const reading = held.record.of(at.path)
    if (reading === null) short.push(slug)
    else if (reading.oid !== oidOf(readFileSync(at.path, "utf8"))) short.push(slug)
  }
  if (short.length === 0) {
    const now = new Set(already ?? [])
    for (const slug of owed) now.add(slug)
    cleared.set(held.record, now)
  }
  return short
}

function owedFor(path: string, held: Held): readonly string[] {
  const slug = held.slugOf(path)
  return slug === null ? [] : closureFor(slug, held.corpus)
}

function shortOf(path: string, held: Held): Refusal | null {
  const short = seatShort(held, owedFor(path, held))
  if (short.length === 0) return null
  const named = short
    .map((slug) => held.corpus.at(slug)?.path ?? slug)
    .map((at) => `  ops read --file-path ${at}`)
    .join("\n")
  return refusal(
    `${path} requires ${short.length} document(s) nothing on record says you have read.\n${named}`
  )
}

export function authoring(path: string, body: string, held: Held): Landing | Refusal {
  if (!existsSync(path)) {
    return refusal(`${path} does not exist — a body written over nothing is a creation, not a write`)
  }
  const standing = oidOf(readFileSync(path, "utf8"))
  const reading = held.record.of(path)
  if (reading === null) {
    return refusal(
      `You have not read ${path}, so this change may be landing on top of work someone else did.\n` +
        `  ops read --file-path ${path}`
    )
  }
  if (reading.oid !== standing) {
    return refusal(
      `${path} changed after you read it, so what you are overwriting is not what you saw.\n` +
        `  ops read --file-path ${path}`
    )
  }
  const short = shortOf(path, held)
  if (short !== null) return short
  return witnessWrite(path, standing, body, held)
}

export function creating(path: string, body: string, held: Held): Landing | Refusal {
  if (existsSync(path)) {
    return refusal(`${path} exists — a body written over one that stands is a write, not a creation`)
  }
  const short = shortOf(path, held)
  if (short !== null) return short
  return witnessWrite(path, null, body, held)
}

export function carrying(from: string, to: string, held: Held): Landing | Refusal {
  if (!existsSync(from)) return refusal(`${from} does not exist, so nothing can be carried from it`)
  return witnessWrite(to, null, readFileSync(from, "utf8"), held)
}

export function takingAway(path: string, held: Held): Removal {
  return { kind: "remove", path, by: held.writer, at: Date.now() } as unknown as Removal
}

export function land(all: readonly Change[], held: Held): readonly string[] {
  const done: string[] = []
  for (const one of all) {
    if (one.kind === "remove") {
      rmSync(one.path, { force: true })
      held.index.took(one.path)
      done.push(one.path)
      continue
    }
    if (one.prior !== null) {
      const standing = existsSync(one.path) ? oidOf(readFileSync(one.path, "utf8")) : null
      if (standing !== one.prior) {
        throw new Error(
          `${one.path} does not stand as the witness says it did, so nothing was written`
        )
      }
    }
    writeFileSync(one.path, one.body)
    held.record.keep(one.path, oidOf(one.body), Date.now(), one.body)
    held.index.wrote(one.path, one.body)
    done.push(one.path)
  }
  held.index.settle()
  held.record.flush()
  return done
}
