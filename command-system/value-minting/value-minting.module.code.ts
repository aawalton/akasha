import { insertedInto } from "@akasha/code/value-inserting"
import type { Generated } from "@akasha/indexes/generated-properties"
import { generatedProperties } from "@akasha/indexes/generated-properties"
import type { Change } from "@akasha/pages/change"
import { heldIn, pageNamed, partedIn } from "@akasha/pages/page-file-name"
import { loadedFrom } from "@akasha/pages/page-value"
import { type Shadow, shadowFor } from "@akasha/pages/shadow"
import { uuidVersion7 } from "akasha/id-minting/uuid-version-7/uuid-version-7.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"
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

export type Minted = {
  readonly changes: readonly FileEdit[]
  readonly filled: readonly Filled[]
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
  changes: readonly FileEdit[]
): ReadonlyMap<string, Generated> {
  const cast = shadowFor(changeOf(root, { base: baseOf(root), edits: changes }))
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

function entriedOnto(shadow: Shadow, changes: readonly FileEdit[]): Minted {
  const shapes = shadow.index.entryShapesAt()
  if (shapes.size === 0) return { changes, filled: [] }
  const pageTypes = shadow.index.pageTypesIn()
  const fileProperties = new Set(shadow.index.fileKeysAt().keys())
  const held: FileEdit[] = []
  const filled: Filled[] = []
  for (const one of changes) {
    const body = one.body
    if (body === null) {
      held.push(one)
      continue
    }
    const said = heldIn(one.path, pageTypes, fileProperties)
    if (said.kind !== "property" || said.propertySlug === null || !shapes.has(said.propertySlug)) {
      held.push(one)
      continue
    }
    const next = identifiedOver(new TextDecoder().decode(body))
    if (next === null) {
      held.push(one)
      continue
    }
    held.push({ ...one, body: new TextEncoder().encode(next) })
    filled.push({ path: one.path, keys: [ID], why: NEW_ENTRY })
  }
  return { changes: held, filled }
}

function couldTurn(change: Change, changes: readonly FileEdit[]): boolean {
  for (const one of changes) {
    const body = one.body
    if (body === null) continue
    const said = partedIn(one.path)
    if (said === null) continue
    if (said.sections.length > 0) {
      if (identifiedOver(new TextDecoder().decode(body)) !== null) return true
      continue
    }
    if (said.held === HELD_TS && change.before(one.path) === null) return true
  }
  return false
}

export function mintingOnto(root: string, changes: readonly FileEdit[]): Minted {
  const change = changeOf(root, { base: baseOf(root), edits: changes })
  if (!couldTurn(change, changes)) return { changes, filled: [] }
  const cast = shadowFor(change)
  if ("refused" in cast) return { changes, filled: [] }
  const entried = entriedOnto(cast.shadow, changes)
  const early = earlyOf(cast.shadow)
  if (early.size === 0) return entried
  const pageTypes = cast.shadow.index.pageTypesIn()
  const held: FileEdit[] = []
  const filled: Filled[] = []
  for (const one of entried.changes) {
    const body = one.body
    const leftAlone =
      body === null || !pageNamed(one.path, pageTypes) || change.before(one.path) !== null
    if (leftAlone) {
      held.push(one)
      continue
    }
    let text = new TextDecoder().decode(body)
    const value = loadedFrom(text).value
    if (value === null) {
      held.push(one)
      continue
    }
    const keys: string[] = []
    for (const [slug, said] of early) {
      if (value[said.key] !== undefined) continue
      const next = insertedInto(one.path, text, said.key, mintedFor(said.kind, slug))
      if (next === null) continue
      text = next
      keys.push(said.key)
    }
    if (keys.length === 0) {
      held.push(one)
      continue
    }
    held.push({ ...one, body: new TextEncoder().encode(text) })
    filled.push({ path: one.path, keys, why: NEW_PAGE })
  }
  return { changes: held, filled: [...entried.filled, ...filled] }
}
