import { resolveInstantSentinel } from "akasha/page/core/property-type/modules/date-sentinels/date-sentinels.module.code.ts"
import { foldedInLowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"
import {
  matches,
  weigh,
} from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"
import { coursesUnfinished } from "akasha/page/view/pages/courses-unfinished.view.ts"

export type Row = {
  readonly id: string
  readonly slug: string
  readonly title: string | null
  readonly attributes: Readonly<Record<string, unknown>>
}

export type Queued = {
  readonly id: string
  readonly title: string
  readonly link: string
}

type Narrow = {
  readonly key: string
  readonly comparison: string
  readonly values: readonly unknown[]
}

type Sort = { readonly key: string; readonly descending: boolean }

export type Queue = { readonly narrows: readonly Narrow[]; readonly viewSorts: readonly Sort[] }

type Value = Readonly<Record<string, unknown>>

type Held = { readonly row: Row; readonly value: Value }

const SITE = "the-great-courses"

const OVER_THE_WHOLE_LIST: ReadonlySet<string> = new Set(["in", "not-in"])

function boundOf(raw: unknown, now: Date): unknown {
  if (raw === "now") return now.toISOString()
  if (raw === "eso-day")
    return new Date(resolveInstantSentinel("today", undefined, now)).toISOString()
  if (raw === "eso-day-next") {
    return new Date(resolveInstantSentinel("tomorrow", undefined, now)).toISOString()
  }
  return raw
}

function heldOf(row: Row): Held {
  return { row, value: { ...row.attributes, title: row.title, slug: row.slug } }
}

function kept(value: Value, narrow: Narrow, now: Date): boolean {
  const held = value[foldedInLowerCamelCase(narrow.key)]
  const bound = OVER_THE_WHOLE_LIST.has(narrow.comparison)
    ? narrow.values.map((one) => boundOf(one, now))
    : boundOf(narrow.values[0], now)
  return matches(held, narrow.comparison, bound)
}

function linkOf(value: Value): string | null {
  const held = value.externalIdentity
  if (!Array.isArray(held)) return null
  for (const one of held) {
    if (one === null || typeof one !== "object") continue
    const said = one as Value
    if (said.source === SITE && typeof said.externalLink === "string") return said.externalLink
  }
  return null
}

function ordered(sorts: readonly Sort[]) {
  return (one: Held, two: Held): number => {
    for (const sort of sorts) {
      const key = foldedInLowerCamelCase(sort.key)
      const by = weigh(one.value[key], two.value[key])
      if (by !== 0) return sort.descending ? -by : by
    }
    return 0
  }
}

export function queuedFrom(
  rows: readonly Row[],
  now: Date,
  queue: Queue = coursesUnfinished
): readonly Queued[] {
  const out: Queued[] = []
  const held = rows
    .map(heldOf)
    .filter((one) => queue.narrows.every((narrow) => kept(one.value, narrow, now)))
    .sort(ordered(queue.viewSorts))
  for (const one of held) {
    const link = linkOf(one.value)
    if (link === null) continue
    out.push({ id: one.row.id, title: one.row.title ?? one.row.slug, link })
  }
  return out
}
