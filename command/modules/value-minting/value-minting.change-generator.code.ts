import { isDeepStrictEqual } from "node:util"
import type { Generated as Answered } from "akasha/change/generator/modules/change-generating/change-generating.module.code.ts"
import type {
  Adding,
  FileChange,
  Replacing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textIn, textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import {
  insertedInto,
  replacedIn,
} from "akasha/code/reading/modules/value-inserting/value-inserting.module.code.ts"
import { formattedBodies } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import { watchedFor } from "akasha/command/modules/watched-minting/watched-minting.module.code.ts"
import { changedInstant } from "akasha/page/generator-kind/pages/changed-instant.generator-kind.ts"
import { createdInstant } from "akasha/page/generator-kind/pages/created-instant.generator-kind.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Generated } from "akasha/page/index/modules/generated-properties/generated-properties.module.code.ts"
import { generatedProperties } from "akasha/page/index/modules/generated-properties/generated-properties.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  heldIn,
  pageNamed,
  partedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { type Shadow, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"
import { z } from "zod"

const BYTES = new TextEncoder()

const ROW_SAID = z.record(z.string(), z.unknown())

const UUID_V7 = "uuid-v7"

const ID = "id"

const HELD_TS = "ts"

const NEW_PAGE = "a page being created states none of its own"

const NEW_ENTRY = "an entry arriving without one is given one"

const CHANGED_PAGE = "a page whose committed values changed states when they did"

const INSTANTS: ReadonlySet<string> = new Set([createdInstant.slug, changedInstant.slug])

type Said = Readonly<Record<string, unknown>>

type Filled = {
  readonly path: string
  readonly keys: readonly string[]
  readonly why: string
}

type Bodied = Adding | Replacing

type Rewritten = {
  readonly changes: readonly FileChange[]
  readonly filled: readonly Filled[]
}

type Minted = {
  readonly edits: readonly Replacing[]
  readonly filled: readonly Filled[]
}

const NOTHING_MINTED: Minted = { edits: [], filled: [] }

function bodiedIn(one: FileChange): Bodied | null {
  return one.kind === "add" || one.kind === "replace" ? one : null
}

function bodyOf(one: Bodied): string {
  return one.kind === "add" ? one.content : one.contentTo
}

function bodiedWith(one: Bodied, body: string): Bodied {
  return one.kind === "add" ? { ...one, content: body } : { ...one, contentTo: body }
}

function rowsFor(was: readonly FileChange[], now: readonly FileChange[]): readonly Replacing[] {
  const before = new Map<string, string>()
  for (const one of was) {
    const held = bodiedIn(one)
    if (held !== null) before.set(held.path, bodyOf(held))
  }
  const rows: Replacing[] = []
  for (const one of now) {
    const held = bodiedIn(one)
    if (held === null) continue
    const from = before.get(held.path)
    const to = bodyOf(held)
    if (from === undefined || from === to) continue
    rows.push({ kind: "replace", path: held.path, contentFrom: from, contentTo: to })
  }
  return rows
}

export function mintedFor(kind: string, slug: string, now: number = Date.now()): string {
  if (kind === UUID_V7) return JSON.stringify(uuidVersion7())
  if (INSTANTS.has(kind)) return JSON.stringify(new Date(now).toISOString())
  throw new Error(
    `\`${slug}\` is worked out by \`${kind}\` before the checks, and nothing here works that kind out`
  )
}

function earlyOf(shadow: Shadow): ReadonlyMap<string, Generated> {
  const found = new Map<string, Generated>()
  for (const [slug, one] of generatedProperties(shadow)) {
    if (!one.afterChecks) found.set(slug, one)
  }
  return found
}

export function identified(line: string): string | null {
  const said = line.trim()
  if (said === "") return null
  let row: Record<string, unknown> | undefined
  try {
    row = ROW_SAID.safeParse(JSON.parse(said)).data
  } catch {
    return null
  }
  if (row === undefined) return null
  if (typeof row[ID] === "string") return null
  return JSON.stringify({ [ID]: uuidVersion7(), ...row })
}

export function identifiedOver(text: string): string | null {
  const lines = text.split("\n")
  let turned = false
  const said = lines.map((line) => {
    const next = identified(line)
    if (next === null) return line
    turned = true
    return next
  })
  return turned ? said.join("\n") : null
}

export function entriedIn(index: Answering): (path: string) => boolean {
  const shapes = index.entryShapesAt()
  if (shapes.size === 0) return () => false
  const pageTypes = index.pageTypesIn()
  const fileProperties = new Set(index.fileKeysAt().keys())
  return (path) => {
    const said = heldIn(path, pageTypes, fileProperties)
    return said.kind === "property" && said.propertySlug !== null && shapes.has(said.propertySlug)
  }
}

function entriedOnto(shadow: Shadow, changes: readonly FileChange[]): Rewritten {
  const entried = entriedIn(shadow.index)
  const held: FileChange[] = []
  const filled: Filled[] = []
  for (const one of changes) {
    const body = bodiedIn(one)
    if (body === null) {
      held.push(one)
      continue
    }
    if (!entried(body.path)) {
      held.push(one)
      continue
    }
    const next = identifiedOver(bodyOf(body))
    if (next === null) {
      held.push(one)
      continue
    }
    held.push(bodiedWith(body, next))
    filled.push({ path: body.path, keys: [ID], why: NEW_ENTRY })
  }
  return { changes: held, filled }
}

function couldTurn(changes: readonly FileChange[]): boolean {
  for (const one of changes) {
    const body = bodiedIn(one)
    if (body === null) continue
    const said = partedIn(body.path)
    if (said === null) continue
    if (said.sections.length > 0) {
      if (identifiedOver(bodyOf(body)) !== null) return true
      continue
    }
    if (said.held === HELD_TS) return true
  }
  return false
}

function rowsIn(change: Change): readonly FileChange[] {
  const rows: FileChange[] = []
  for (const path of change.changed) {
    const body = textOf(change.after(path))
    rows.push(body === null ? { kind: "remove", path } : { kind: "add", path, content: body })
  }
  return rows
}

function saidOf(one: Filled): string {
  return `\`${one.path}\` was given ${one.keys.map((key) => `\`${key}\``).join(", ")} — ${one.why}`
}

function formattedIn(root: string, edits: readonly Replacing[]): readonly Replacing[] {
  if (edits.length === 0) return edits
  const done = formattedBodies(
    root,
    new Map(edits.map((one) => [one.path, BYTES.encode(one.contentTo)]))
  )
  return edits.map((one) => {
    const made = done.get(one.path)
    return made === undefined ? one : { ...one, contentTo: textIn(made.body) }
  })
}

export function generateChange(change: Change): Answered {
  const minted = mintedOver(change, rowsIn(change))
  return { edits: formattedIn(change.root, minted.edits), said: minted.filled.map(saidOf) }
}

function valueIn(bytes: Uint8Array | null): Said | null {
  const text = textOf(bytes)
  return text === null ? null : loadedFrom(text).value
}

function movedFrom(change: Change, pageTypes: ReadonlySet<string>): ReadonlyMap<string, Said> {
  const found = new Map<string, Said>()
  for (const path of change.changed) {
    if (change.after(path) !== null || !pageNamed(path, pageTypes)) continue
    const was = valueIn(change.before(path))
    const id = was?.[ID]
    if (was !== null && was !== undefined && typeof id === "string") found.set(id, was)
  }
  return found
}

function wasAt(change: Change, path: string, value: Said, moved: ReadonlyMap<string, Said>) {
  const was = valueIn(change.before(path))
  if (was !== null) return was
  const id = value[ID]
  return typeof id === "string" ? (moved.get(id) ?? null) : null
}

function without(value: Said, keys: readonly string[]): Said {
  const kept: Record<string, unknown> = { ...value }
  for (const key of keys) delete kept[key]
  return kept
}

type Minting = {
  readonly path: string
  readonly value: Said
  readonly was: Said | null
  readonly again: readonly string[]
  readonly early: readonly string[]
  readonly now: number
}

function mintedInto(text: string, slug: string, said: Generated, over: Minting): string | null {
  if (said.watches !== null) {
    const { path, value, was, now } = over
    const put = watchedFor({ key: said.key, watches: said.watches, value, was, now })
    if (put === null) return null
    if (put.placing === "replace") return replacedIn(path, text, said.key, put.said)
    return insertedInto(path, text, said.key, put.said, "last")
  }
  const { path, value, was, again, now } = over
  const minted = mintedFor(said.kind, slug, now)
  const placing = INSTANTS.has(said.kind) ? "last" : "first"
  if (was === null) {
    if (value[said.key] !== undefined) return null
    return insertedInto(path, text, said.key, minted, placing)
  }
  const dropped = over.early.filter((key) => value[key] === undefined)
  const changed = !isDeepStrictEqual(without(value, again), without(was, [...again, ...dropped]))
  const kept = was[said.key]
  if (value[said.key] === undefined && kept !== undefined) {
    const carried = said.everyChange && changed ? minted : JSON.stringify(kept)
    return insertedInto(path, text, said.key, carried, placing)
  }
  if (!said.everyChange) return null
  if (!changed) return null
  if (!isDeepStrictEqual(value[said.key], was[said.key])) return null
  if (value[said.key] === undefined) return insertedInto(path, text, said.key, minted, placing)
  return replacedIn(path, text, said.key, minted)
}

function mintedOver(change: Change, changes: readonly FileChange[]): Minted {
  if (!couldTurn(changes)) return NOTHING_MINTED
  const cast = shadowFor(change)
  if ("refused" in cast) return NOTHING_MINTED
  const entried = entriedOnto(cast.shadow, changes)
  const early = earlyOf(cast.shadow)
  if (early.size === 0) return { edits: rowsFor(changes, entried.changes), filled: entried.filled }
  const pageTypes = cast.shadow.index.pageTypesIn()
  const again = [...early.values()].filter((one) => one.everyChange).map((one) => one.key)
  const earlyKeys = [...early.values()].map((one) => one.key)
  const moved = movedFrom(change, pageTypes)
  const now = Date.now()
  const held: FileChange[] = []
  const filled: Filled[] = []
  for (const one of entried.changes) {
    const body = bodiedIn(one)
    if (body === null || !pageNamed(body.path, pageTypes)) {
      held.push(one)
      continue
    }
    let text = bodyOf(body)
    const value = loadedFrom(text).value
    if (value === null) {
      held.push(one)
      continue
    }
    const was = wasAt(change, body.path, value, moved)
    const over: Minting = { path: body.path, value, was, again, early: earlyKeys, now }
    const keys: string[] = []
    for (const [slug, said] of early) {
      const next = mintedInto(text, slug, said, over)
      if (next === null) continue
      text = next
      keys.push(said.key)
    }
    if (keys.length === 0) {
      held.push(one)
      continue
    }
    held.push(bodiedWith(body, text))
    filled.push({ path: body.path, keys, why: was === null ? NEW_PAGE : CHANGED_PAGE })
  }
  return { edits: rowsFor(changes, held), filled: [...entried.filled, ...filled] }
}
