import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { recorder } from "akasha/agent/role/pages/recorder.role.ts"
import { reviewer } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder } from "akasha/agent/role/pages/story-recorder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"
import type { BodyOf, FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

type Declared = Pick<Carried, "required" | "pageTypeSlug" | "pagePropertySlug">

export type Knowing = Pick<Answering, "pageAt" | "kindsUnder"> & {
  readonly declarationsOf: (pageTypeSlug: string) => readonly Declared[]
}

const MECHANIC = "world-mechanic"

const CHARACTER = "world-character"

const RELATIONS: ReadonlySet<string> = new Set(["relation-property", "multi-relation-property"])

const TARGET = "targetPageType"

const ROLE = "role"

const PRINCIPAL = "principalSeatName"

const SEAT = "seat"

const SUBAGENT = "subagent"

const PAGE_HELD = "ts"

export const BARRED: ReadonlySet<string> = new Set([
  gameMaster.slug,
  recorder.slug,
  reviewer.slug,
  storyRecorder.slug,
  writer.slug,
])

function seatRole(index: Knowing, seat: string | null): string | null {
  if (seat === null) return null
  const value = index.pageAt(SEAT, seat)
  return value === null ? null : slugAt(value, ROLE)
}

export function roleOf(index: Knowing, page: string): string | null {
  const parted = partedIn(page)
  if (parted === null) return null
  if (parted.pageType === SEAT) return seatRole(index, parted.slug)
  if (parted.pageType !== SUBAGENT) return null
  const value = index.pageAt(SUBAGENT, parted.slug)
  return value === null ? null : seatRole(index, slugAt(value, PRINCIPAL))
}

function holding(index: Knowing, pageType: string, kinds: ReadonlySet<string>): boolean {
  return index.declarationsOf(pageType).some((one) => {
    if (!one.required || !RELATIONS.has(one.pageTypeSlug)) return false
    const property = index.pageAt(one.pageTypeSlug, one.pagePropertySlug)
    const target = property === null ? null : slugAt(property, TARGET)
    return target !== null && kinds.has(target)
  })
}

export function definedIn(
  index: Knowing,
  bodyOf: BodyOf,
  asked: readonly FileChange[]
): readonly string[] {
  const kinds = index.kindsUnder(MECHANIC)
  const defined = new Set([...kinds, ...index.kindsUnder(CHARACTER)])
  const found: string[] = []
  for (const edit of asked) {
    if (edit.kind !== "add" || bodyOf(edit.path) !== null) continue
    const parted = partedIn(edit.path)
    if (parted === null || parted.held !== PAGE_HELD || parted.sections.length > 0) continue
    if (!kinds.has(parted.pageType) || holding(index, parted.pageType, defined)) continue
    found.push(edit.path)
  }
  return found
}

export function definingRefused(
  index: Knowing,
  bodyOf: BodyOf,
  page: string,
  asked: readonly FileChange[]
): readonly string[] {
  const role = roleOf(index, page)
  if (role === null || !BARRED.has(role)) return []
  return definedIn(index, bodyOf, asked).map(
    (path) =>
      `\`${path}\` would define a mechanic, and only the world builder defines one, so ask the world builder to define it`
  )
}
