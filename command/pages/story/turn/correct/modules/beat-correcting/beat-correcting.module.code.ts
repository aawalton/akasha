import { jsonEqual } from "akasha/code/type/narrowing/modules/json-equal/json-equal.module.code.ts"
import {
  inOrder,
  type Paged,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import type { Unbeating } from "akasha/command/pages/story/turn/modules/cancel-unbeating/cancel-unbeating.module.code.ts"
import {
  mergedNamings,
  shownOf,
} from "akasha/command/pages/story/turn/modules/turn-unplaying/turn-unplaying.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  type BeatChange,
  changesRefused,
  type Reading,
  recordIn,
  said,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import {
  type Beats,
  NO_BEATS,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  stepIn,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const PARTED = "/"

const STATUS = "stepStatus"

const BREAK = "\n"

type Refused = { readonly refused: string }

export type Placed = { readonly slug: string; readonly beats: Beats; readonly shown: number }

export type Correction = {
  readonly story: readonly Placed[]
  readonly at: number
  readonly beat: number
  readonly changes: readonly BeatChange[]
}

export type Corrected = {
  readonly namings: readonly Naming[]
  readonly files: readonly { readonly at: string; readonly content: string }[]
  readonly report: readonly string[]
}

type Entry = { readonly at: number; readonly beat: number; readonly change: BeatChange }

function placedOf(one: Paged): Placed | Refused {
  const beats = one.beats
  if (beats === undefined) return { slug: one.slug, beats: NO_BEATS, shown: 0 }
  if ("refused" in beats) return beats
  if (one.closed === true) return { slug: one.slug, beats, shown: beats.beats.length }
  const status = stepIn(one.value[STATUS]) ?? WORLD_BUILDER
  return { slug: one.slug, beats, shown: shownOf(status, beats) }
}

export function placedIn(
  story: readonly Paged[],
  own: Placed
): { readonly placed: readonly Placed[]; readonly at: number } | Refused {
  const placed: Placed[] = []
  for (const one of inOrder(story)) {
    const entry = one.slug === own.slug ? own : placedOf(one)
    if ("refused" in entry) return entry
    placed.push(entry)
  }
  const at = placed.findIndex((one) => one.slug === own.slug)
  return at < 0 ? { refused: `\`${own.slug}\` is no turn of its story` } : { placed, at }
}

function setting(one: BeatChange): boolean {
  return one.make === undefined && one.key !== undefined && "to" in one
}

function appending(one: BeatChange): boolean {
  return one.make === undefined && one.key !== undefined && one.append !== undefined
}

function on(page: string, key: string): (one: BeatChange) => boolean {
  return (one) => one.page === page && one.key === key
}

function entriesOf(story: readonly Placed[]): readonly Entry[] {
  return story.flatMap((placed, at) =>
    placed.beats.changes
      .filter((one) => one.beat <= placed.shown)
      .map((change) => ({ at, beat: change.beat, change }))
  )
}

type Spot = { readonly page: string; readonly key: string }

function spotsOf(changes: readonly BeatChange[], kept: (one: BeatChange) => boolean): Spot[] {
  const spots = new Map<string, Spot>()
  for (const one of changes.filter(kept)) {
    const key = one.key ?? ""
    spots.set(`${one.page}${BREAK}${key}`, { page: one.page, key })
  }
  return [...spots.values()]
}

export function respliced<Item>(
  items: readonly Item[],
  read: (item: Item) => unknown,
  removed: readonly unknown[],
  added: readonly Item[]
): readonly Item[] {
  const taken = new Set<number>()
  for (const one of removed) {
    for (let at = items.length - 1; at >= 0; at -= 1) {
      const item = items[at]
      if (taken.has(at) || item === undefined || !jsonEqual(read(item), one)) continue
      taken.add(at)
      break
    }
  }
  const first = taken.size === 0 ? items.length : Math.min(...taken)
  const kept = items.filter((_, at) => !taken.has(at))
  return [...kept.slice(0, first), ...added, ...kept.slice(first)]
}

function makesRefused(old: readonly BeatChange[], now: readonly BeatChange[]): string | null {
  const made = (list: readonly BeatChange[]) => list.filter((one) => one.make !== undefined)
  const had = made(old)
  const has = made(now)
  const same =
    had.length === has.length &&
    had.every((one) => has.some((two) => two.page === one.page && jsonEqual(two.make, one.make)))
  if (same) return null
  return "a correction makes each page its beat made, as the beat made it, and makes no other"
}

type Story = {
  readonly old: readonly BeatChange[]
  readonly earlier: readonly Entry[]
  readonly later: readonly Entry[]
}

function storyOf(correction: Correction): Story {
  const entries = entriesOf(correction.story)
  const { at, beat } = correction
  const placed = correction.story[at]
  const old = (placed?.beats.changes ?? []).filter((one) => one.beat === beat)
  const before = (one: Entry) => one.at < at || (one.at === at && one.beat < beat)
  const after = (one: Entry) => one.at > at || (one.at === at && one.beat > beat)
  return { old, earlier: entries.filter(before), later: entries.filter(after) }
}

function beforeOf(story: Story, reading: Reading, spot: Spot): unknown {
  const same = on(spot.page, spot.key)
  const earlier = story.earlier.filter((one) => setting(one.change) && same(one.change)).at(-1)
  if (earlier !== undefined) return earlier.change.to
  const own = story.old.find((one) => setting(one) && same(one))
  if (own !== undefined) return own.from
  const later = story.later.find((one) => setting(one.change) && same(one.change))
  if (later !== undefined) return later.change.from
  return reading.valueOf(spot.page, spot.key)
}

function lastTo(changes: readonly BeatChange[], spot: Spot, fallback: unknown): unknown {
  const last = changes.filter((one) => setting(one) && on(spot.page, spot.key)(one)).at(-1)
  return last === undefined ? fallback : last.to
}

function appendsOf(changes: readonly BeatChange[], spot: Spot): readonly unknown[] {
  return changes
    .filter((one) => appending(one) && on(spot.page, spot.key)(one))
    .map((one) => one.append)
}

function overlaid(reading: Reading, story: Story, now: readonly BeatChange[]): Reading {
  const set = spotsOf([...story.old, ...now], setting)
  const listed = spotsOf([...story.old, ...now], appending)
  const has = (spots: readonly Spot[], page: string, key: string) =>
    spots.some((one) => one.page === page && one.key === key)
  const made = new Set(story.old.filter((one) => one.make !== undefined).map((one) => one.page))
  return {
    ...reading,
    exists: (page) => !made.has(page) && reading.exists(page),
    valueOf: (page, key) => {
      if (has(set, page, key)) return beforeOf(story, reading, { page, key })
      const value = reading.valueOf(page, key)
      if (!has(listed, page, key) || !Array.isArray(value)) return value
      return respliced(value, (one) => one, appendsOf(story.old, { page, key }), [])
    },
  }
}

function lineOf(text: string): unknown {
  return recordIn(text) ?? text
}

type Writing = {
  readonly values: Map<string, Record<string, unknown>>
  readonly files: { at: string; content: string }[]
  readonly report: string[]
}

function valuesOn(writing: Writing, page: string): Record<string, unknown> {
  const held = writing.values.get(page) ?? {}
  writing.values.set(page, held)
  return held
}

function setsWritten(
  writing: Writing,
  story: Story,
  reading: Reading,
  now: readonly BeatChange[],
  slugOf: (at: number) => string
) {
  for (const spot of spotsOf([...story.old, ...now], setting)) {
    const before = beforeOf(story, reading, spot)
    const was = lastTo(story.old, spot, before)
    const is = lastTo(now, spot, before)
    const next = story.later.find(
      (one) => setting(one.change) && on(spot.page, spot.key)(one.change)
    )
    if (next !== undefined) {
      if (jsonEqual(was, is)) continue
      const from = said(next.change.from)
      writing.report.push(
        `unchained\t${spot.page}\t${spot.key}\tbeat ${next.beat} of ${slugOf(next.at)} starts from ${from}, and this beat now leaves ${said(is)}: correct that beat next`
      )
      continue
    }
    if (jsonEqual(reading.valueOf(spot.page, spot.key) ?? null, is ?? null)) continue
    valuesOn(writing, spot.page)[spot.key] = is
    writing.report.push(`set\t${spot.page}\t${spot.key}\t${said(is)}`)
  }
}

function appendsWritten(
  writing: Writing,
  story: Story,
  reading: Reading,
  beating: Unbeating,
  now: readonly BeatChange[]
): Refused | null {
  for (const spot of spotsOf([...story.old, ...now], appending)) {
    const removed = appendsOf(story.old, spot)
    const added = appendsOf(now, spot)
    if (jsonEqual(removed, added)) continue
    if (reading.filed(spot.page, spot.key) === null) {
      const value = reading.valueOf(spot.page, spot.key)
      const list = Array.isArray(value) ? value : []
      valuesOn(writing, spot.page)[spot.key] = respliced(list, (one) => one, removed, added)
      writing.report.push(`relisted\t${spot.page}\t${spot.key}`)
      continue
    }
    const page = beating.pageOf(spot.page)
    const file = page === null ? null : beating.beside(page, spot.key)
    if (file === null) {
      return {
        refused: `\`${spot.page}\` keeps \`${spot.key}\` in no file a correction can rewrite`,
      }
    }
    const lines = file.text.split(BREAK).filter((one) => one.trim() !== "")
    const put = added.map((one) => JSON.stringify(one))
    const kept = respliced(lines, lineOf, removed, put)
    const content = kept.length === 0 ? "" : `${kept.join(BREAK)}${BREAK}`
    writing.files.push({ at: file.at, content })
    writing.report.push(`rewritten\t${file.at}`)
  }
  return null
}

function namingsOf(writing: Writing, beating: Unbeating): readonly Naming[] | Refused {
  const namings: Naming[] = []
  for (const [page, values] of writing.values) {
    const read = beating.pageOf(page)
    if (read === null) return { refused: `\`${page}\`, which the beat changes, is no page here` }
    const cut = page.indexOf(PARTED)
    namings.push({
      pageTypeSlug: page.slice(0, cut),
      slug: page.slice(cut + 1),
      path: read.at,
      values,
      merge: true,
    })
  }
  return mergedNamings(namings)
}

export function correctedOn(
  correction: Correction,
  reading: Reading,
  beating: Unbeating
): Corrected | Refused {
  const story = storyOf(correction)
  const now = correction.changes
  const stray = now.find((one) => one.beat !== correction.beat)
  if (stray !== undefined) {
    return {
      refused: `a change names beat ${stray.beat}, and this corrects beat ${correction.beat}`,
    }
  }
  const made = makesRefused(story.old, now)
  if (made !== null) return { refused: made }
  const wrong = changesRefused(now, overlaid(reading, story, now))
  if (wrong !== null) return { refused: wrong }
  const writing: Writing = { values: new Map(), files: [], report: [] }
  const slugOf = (at: number) => correction.story[at]?.slug ?? ""
  setsWritten(writing, story, reading, now, slugOf)
  const appended = appendsWritten(writing, story, reading, beating, now)
  if (appended !== null) return appended
  const namings = namingsOf(writing, beating)
  if ("refused" in namings) return namings
  return { namings, files: writing.files, report: writing.report }
}
