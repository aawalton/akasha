import type { DeclaredType, Value } from "../formula/formula.ts"
import type { Declared } from "../query/query.ts"
import type { Stated } from "../read/files.ts"
import { type Composing, type Entry, type Front, frontOf } from "./front.ts"
import { type Kept, type Raw, rawAs } from "./held.ts"
import { idAt } from "./id.ts"

export type Writing = {
  readonly pageType: string
  readonly declared: Declared
  readonly setting: Readonly<Record<string, Value>>
  readonly body: string
  readonly standing: Stated | null
  readonly now: number
  readonly random: () => number
}

const MARK = String.fromCharCode(96)

const PAGE_TYPE = "page-type-slug"

const ID = "id"

const SEQ = "seq"

const OWN: ReadonlySet<string> = new Set([PAGE_TYPE, ID, SEQ])

const UNDECLARED = "is not declared by this page type, so nothing here knows how to state it"

const COMPUTED = "is worked out by a formula, and stating it would freeze one answer into the page"

const ELSEWHERE = "is held beside the page rather than in it, so it cannot be stated here"

const UNCARRIED = "stands here holding what no page can state again, so it cannot be carried through"

const OTHER_ID = "stands here holding no identity, and minting one over it would make this another page"

const OTHER_SEQ = "stands here holding what no sequence number is"

const whyOf = (key: string, why: string): string => MARK + key + MARK + " " + why

const refusedAs = (key: string, why: string): Front => ({ kind: "refused", why: whyOf(key, why) })

const rawOf = (held: unknown): Raw | null => {
  if (typeof held === "string" || typeof held === "boolean") return held
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  return null
}

const carriedAs = (key: string, held: unknown): Kept => {
  if (!Array.isArray(held)) {
    const raw = rawOf(held)
    if (raw === null) return { kind: "refused", why: whyOf(key, UNCARRIED) }
    return { kind: "value", raw }
  }
  const items: Raw[] = []
  for (const one of held) {
    const raw = rawOf(one)
    if (raw === null) return { kind: "refused", why: whyOf(key, UNCARRIED) }
    items.push(raw)
  }
  return { kind: "value", raw: items }
}

const idFor = (writing: Writing): string | Front => {
  const standing = writing.standing
  if (standing === null || !Object.hasOwn(standing, ID)) return idAt(writing.now, writing.random)
  const held = standing[ID]
  if (typeof held !== "string" || held.trim() === "") return refusedAs(ID, OTHER_ID)
  return held
}

const seqFor = (standing: Stated | null): number | null | Front => {
  if (standing === null || !Object.hasOwn(standing, SEQ)) return null
  const held = standing[SEQ]
  if (typeof held !== "number" || !Number.isFinite(held)) return refusedAs(SEQ, OTHER_SEQ)
  return held
}

type Setting = {
  readonly value: Value
  readonly type: DeclaredType
}

const settingIn = (writing: Writing): Map<string, Setting> | Front => {
  const setting = new Map<string, Setting>()
  for (const [key, value] of Object.entries(writing.setting)) {
    if (Object.hasOwn(writing.declared.beyond, key)) return refusedAs(key, ELSEWHERE)
    if (!Object.hasOwn(writing.declared.properties, key)) return refusedAs(key, UNDECLARED)
    const property = writing.declared.properties[key]
    if (property === undefined) return refusedAs(key, UNDECLARED)
    if (property.formula !== undefined) return refusedAs(key, COMPUTED)
    setting.set(key, { value, type: property.type })
  }
  return setting
}

export const pageWith = (writing: Writing): Front => {
  const setting = settingIn(writing)
  if (!(setting instanceof Map)) return setting
  const id = idFor(writing)
  if (typeof id !== "string") return id
  const seq = seqFor(writing.standing)
  if (seq !== null && typeof seq !== "number") return seq

  const standing = writing.standing
  const stated: readonly (readonly [string, unknown])[] =
    standing === null ? [] : Object.entries(standing)
  const entries: Entry[] = []
  const stood = new Set<string>()
  for (const [key, held] of stated) {
    if (OWN.has(key)) continue
    stood.add(key)
    const mine = setting.get(key)
    entries.push([
      key,
      mine === undefined ? carriedAs(key, held) : rawAs(key, mine.value, mine.type),
    ])
  }
  for (const [key, mine] of setting) {
    if (stood.has(key)) continue
    entries.push([key, rawAs(key, mine.value, mine.type)])
  }

  const composing: Composing =
    seq === null
      ? { pageType: writing.pageType, id, entries, body: writing.body }
      : { pageType: writing.pageType, id, seq, entries, body: writing.body }
  return frontOf(composing)
}
