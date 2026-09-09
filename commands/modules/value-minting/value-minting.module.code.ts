import { insertedInto } from "@akasha/code/value-inserting"
import type { Generated } from "@akasha/indexes/generated-properties"
import { generatedProperties } from "@akasha/indexes/generated-properties"
import type { Change } from "@akasha/pages/change"
import { heldIn, pageNamed, partedIn } from "@akasha/pages/page-file-name"
import { loadedFrom } from "@akasha/pages/page-value"
import { type Shadow, shadowFor } from "@akasha/pages/shadow"
import { uuidVersion7 } from "akasha/id-minting/uuid-version-7/uuid-version-7.module.code.ts"
import type {
  Adding,
  FileChange,
  Replacing,
} from "../../../changes/modules/answer/change-answer.module.types.ts"
import { baseOf, changeOf } from "../landing/landing.module.code.ts"

const UUID_V7 = "uuid-v7"

const ID = "id"

const HELD_TS = "ts"

const NEW_PAGE = "a page being created states none of its own"

const NEW_ENTRY = "an entry arriving without one is given one"

export type Filled = {
  readonly path: string
  readonly keys: readonly string[]
  readonly why: string
}

type Bodied = Adding | Replacing

type Rewritten = {
  readonly changes: readonly FileChange[]
  readonly filled: readonly Filled[]
}

export type Minted = {
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

export function mintedFor(kind: string, slug: string): string {
  if (kind === UUID_V7) return JSON.stringify(uuidVersion7())
  throw new Error(
    `\`${slug}\` is worked out by \`${kind}\` before the checks, and nothing here works that kind out`
  )
}

export function earlyOf(shadow: Shadow): ReadonlyMap<string, Generated> {
  const found = new Map<string, Generated>()
  for (const [slug, one] of generatedProperties(shadow)) {
    if (!one.afterChecks) found.set(slug, one)
  }
  return found
}

export function earlyIn(
  root: string,
  changes: readonly FileChange[]
): ReadonlyMap<string, Generated> {
  const cast = shadowFor(changeOf(root, baseOf(root), changes))
  if ("refused" in cast) return new Map()
  return earlyOf(cast.shadow)
}

export function identified(line: string): string | null {
  const said = line.trim()
  if (said === "") return null
  let held: unknown
  try {
    held = JSON.parse(said)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const row = held as Record<string, unknown>
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

function entriedOnto(shadow: Shadow, changes: readonly FileChange[]): Rewritten {
  const shapes = shadow.index.entryShapesAt()
  if (shapes.size === 0) return { changes, filled: [] }
  const pageTypes = shadow.index.pageTypesIn()
  const fileProperties = new Set(shadow.index.fileKeysAt().keys())
  const held: FileChange[] = []
  const filled: Filled[] = []
  for (const one of changes) {
    const body = bodiedIn(one)
    if (body === null) {
      held.push(one)
      continue
    }
    const said = heldIn(body.path, pageTypes, fileProperties)
    if (said.kind !== "property" || said.propertySlug === null || !shapes.has(said.propertySlug)) {
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

function couldTurn(change: Change, changes: readonly FileChange[]): boolean {
  for (const one of changes) {
    const body = bodiedIn(one)
    if (body === null) continue
    const said = partedIn(body.path)
    if (said === null) continue
    if (said.sections.length > 0) {
      if (identifiedOver(bodyOf(body)) !== null) return true
      continue
    }
    if (said.held === HELD_TS && change.before(body.path) === null) return true
  }
  return false
}

export function mintingOnto(root: string, changes: readonly FileChange[]): Minted {
  const change = changeOf(root, baseOf(root), changes)
  if (!couldTurn(change, changes)) return NOTHING_MINTED
  const cast = shadowFor(change)
  if ("refused" in cast) return NOTHING_MINTED
  const entried = entriedOnto(cast.shadow, changes)
  const early = earlyOf(cast.shadow)
  if (early.size === 0) return { edits: rowsFor(changes, entried.changes), filled: entried.filled }
  const pageTypes = cast.shadow.index.pageTypesIn()
  const held: FileChange[] = []
  const filled: Filled[] = []
  for (const one of entried.changes) {
    const body = bodiedIn(one)
    if (body === null || !pageNamed(body.path, pageTypes) || change.before(body.path) !== null) {
      held.push(one)
      continue
    }
    let text = bodyOf(body)
    const value = loadedFrom(text).value
    if (value === null) {
      held.push(one)
      continue
    }
    const keys: string[] = []
    for (const [slug, said] of early) {
      if (value[said.key] !== undefined) continue
      const next = insertedInto(body.path, text, said.key, mintedFor(said.kind, slug))
      if (next === null) continue
      text = next
      keys.push(said.key)
    }
    if (keys.length === 0) {
      held.push(one)
      continue
    }
    held.push(bodiedWith(body, text))
    filled.push({ path: body.path, keys, why: NEW_PAGE })
  }
  return { edits: rowsFor(changes, held), filled: [...entried.filled, ...filled] }
}
