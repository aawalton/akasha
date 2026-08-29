import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import type { Judged, Judging, Leaving } from "../checks-system/judging.module.code.ts"
import type { Corpus, Refusal } from "./corpus.module.code.ts"
import type { Oid, Record_ } from "./reading.module.code.ts"
import { oidOf } from "./reading.module.code.ts"
import { closureFor } from "./required-reading.module.code.ts"

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

export type { Refusal }
export type { Judged, Judging, Leaving }

export type BodyStore = {
  readonly of: (oid: Oid) => string | null
  readonly keep: (oid: Oid, body: string) => void
}

export type Landed =
  | {
      readonly kind: "landed"
      readonly paths: readonly string[]
      readonly consulted: readonly string[]
      readonly noted: readonly string[]
    }
  | {
      readonly kind: "refused"
      readonly by: readonly Judged[]
      readonly consulted: readonly string[]
    }

export type Indexing = {
  readonly wrote: (path: string, body: string, before: string | null) => void
  readonly took: (path: string, before: string | null) => void
  readonly settle: () => readonly string[]
}

export type Held = {
  readonly corpus: Corpus
  readonly record: Record_
  readonly writer: string
  readonly index: Indexing
  readonly bodies: BodyStore
  readonly readAs: string
  readonly judge: Judging
  readonly root: string
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
  for (const path of owed) {
    if (already?.has(path) === true) continue
    const reading = held.record.of(path)
    if (reading === null) short.push(path)
    else if (reading.oid !== oidOf(readFileSync(path, "utf8"))) short.push(path)
  }
  if (short.length === 0) {
    const now = new Set(already ?? [])
    for (const path of owed) now.add(path)
    cleared.set(held.record, now)
  }
  return short
}

function owedFor(path: string, held: Held): readonly string[] {
  return held.corpus.at(path) === null ? [] : closureFor(path, held.corpus)
}

function shortOf(path: string, held: Held): Refusal | null {
  const short = seatShort(held, owedFor(path, held))
  if (short.length === 0) return null
  const named = short.map((at) => `  ${held.readAs} --file-path ${at}`).join("\n")
  return refusal(
    `${path} requires ${short.length} document(s) nothing on record says you have read.\n${named}`
  )
}

export function authoring(path: string, body: string, held: Held): Landing | Refusal {
  if (!existsSync(path)) {
    return refusal(
      `${path} does not exist — a body written over nothing is a creation, not a write`
    )
  }
  const onDisk = oidOf(readFileSync(path, "utf8"))
  const reading = held.record.of(path)
  if (reading === null) {
    return refusal(
      `You have not read ${path}, so this change may be landing on top of work someone else did.\n` +
        `  ${held.readAs} --file-path ${path}`
    )
  }
  if (reading.oid !== onDisk) {
    return refusal(
      `${path} changed after you read it, so what you are overwriting is not what you saw.\n` +
        `  ${held.readAs} --file-path ${path}`
    )
  }
  const short = shortOf(path, held)
  if (short !== null) return short
  return witnessWrite(path, onDisk, body, held)
}

export function creating(path: string, body: string, held: Held): Landing | Refusal {
  if (existsSync(path)) {
    return refusal(
      `${path} exists — a body written over one already there is a write, not a creation`
    )
  }
  const short = shortOf(path, held)
  if (short !== null) return short
  return witnessWrite(path, null, body, held)
}

export function carrying(from: string, to: string, held: Held): Landing | Refusal {
  if (!existsSync(from)) return refusal(`${from} does not exist, so nothing can be carried from it`)
  if (existsSync(to)) {
    return refusal(
      `${to} is already there, and a carry witnesses that nothing was — overwriting it is a write.\n` +
        `  ${held.readAs} --file-path ${to}`
    )
  }
  return witnessWrite(to, null, readFileSync(from, "utf8"), held)
}

export function takingAway(path: string, held: Held): Removal {
  return { kind: "remove", path, by: held.writer, at: Date.now() } as unknown as Removal
}

export function leavingOf(all: readonly Change[], root: string): Leaving {
  const asked = new Map<string, Uint8Array | null>()
  for (const one of all) {
    asked.set(one.path, one.kind === "remove" ? null : Buffer.from(one.body, "utf8"))
  }
  return {
    root,
    changed: [...asked.keys()].sort(),
    at: (path) => {
      const now = asked.get(path)
      if (now !== undefined) return now
      if (!existsSync(path)) return null
      return readFileSync(path)
    },
  }
}

export function land(all: readonly Change[], held: Held): Landed {
  const consulted = held.judge.named
  const by = held.judge.over(leavingOf(all, held.root))
  if (by.length > 0) return { kind: "refused", by, consulted }
  for (const one of all) {
    if (one.kind === "remove" || one.prior === null) continue
    const before = existsSync(one.path) ? readFileSync(one.path, "utf8") : null
    if ((before === null ? null : oidOf(before)) !== one.prior) {
      throw new Error(`${one.path} is not as the witness says it was, so nothing was written`)
    }
  }
  const paths: string[] = []
  for (const one of all) {
    const before = existsSync(one.path) ? readFileSync(one.path, "utf8") : null
    if (one.kind === "remove") {
      rmSync(one.path, { force: true })
      held.index.took(one.path, before)
      paths.push(one.path)
      continue
    }
    writeFileSync(one.path, one.body)
    held.record.keep(one.path, oidOf(one.body), Date.now())
    held.bodies.keep(oidOf(one.body), one.body)
    held.index.wrote(one.path, one.body, before)
    paths.push(one.path)
  }
  held.record.flush()
  let noted: readonly string[] = []
  try {
    noted = held.index.settle()
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    noted = [`the index was not settled, so it is behind the tree until it is rebuilt — ${why}`]
  }
  return { kind: "landed", paths, consulted, noted }
}
