import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { jsonEqual } from "akasha/code/type/narrowing/modules/json-equal/json-equal.module.code.ts"
import { tellerOf } from "akasha/command/pages/story/modules/tell-continuing/tell-continuing.module.code.ts"
import {
  inOrder,
  type Paged,
  playedIn,
  storyIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import {
  type Unbeating,
  unbeaten,
  unbeatingIn,
} from "akasha/command/pages/story/turn/modules/cancel-unbeating/cancel-unbeating.module.code.ts"
import {
  addedLogged,
  bodyCommitted,
} from "akasha/command/pages/story/turn/modules/turn-commits/turn-commits.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { referencesFiled } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { valueAt, valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { shapesFiled } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"
import {
  type BeatChange,
  said,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { shownThrough } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  OPENING,
  replayed,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
import { loreFact } from "akasha/story/lore/properties/lore-fact.text-property.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import { pathOf } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import { characterPlace } from "akasha/story/world/characters/properties/character-place.relation-property.ts"
import {
  BEATS,
  bareOf,
  PLAYER,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const PARTED = "/"

const TYPE = "type"

const SLUG = "slug"

const TEXT = "utf8"

const POSITION = "position"

const PAGE_ENDING = ".ts"

const UNCOMMITTED = ".uncommitted."

const PLACE = characterPlace.propertySlug

const FACTS = loreFacts.propertySlug

const FACT = loreFact.propertySlug

const KNOWERS = loreKnowers.propertySlug

type Refused = { readonly refused: string }

export type Unplaying = {
  readonly beating: Unbeating
  readonly storyOf: (game: string) => readonly Paged[]
  readonly pathOf: (address: string) => string | null
  readonly valueOf: (path: string) => Value | null
  readonly listedAt: (pageTypeSlug: string, slug: string) => readonly { readonly path: string }[]
  readonly valueBefore: (path: string) => Value | null
}

export type Played = {
  readonly slug: string
  readonly game: string
  readonly status: TurnStep
  readonly position: number
  readonly beats: Beats
}

export type Unplayed = {
  readonly namings: readonly Naming[]
  readonly rewritten: readonly { readonly at: string; readonly kept: string }[]
  readonly removed: readonly string[]
  readonly report: readonly string[]
}

export function shownOf(status: TurnStep, beats: Beats): number {
  if (status === PLAYER) return beats.beats.length
  return status === BEATS ? shownThrough(beats) : 0
}

export function movedSince(changes: readonly BeatChange[], reading: Unbeating): string | null {
  const made = new Set(changes.filter((one) => one.make !== undefined).map((one) => one.page))
  const last = new Map<string, BeatChange>()
  for (const one of changes) {
    if (made.has(one.page) || one.key === undefined || !("to" in one)) continue
    last.set(`${one.page}\n${one.key}`, one)
  }
  for (const one of last.values()) {
    const key = one.key ?? ""
    const now = reading.pageOf(one.page)?.value[key]
    if (jsonEqual(now ?? null, one.to ?? null)) continue
    return `\`${key}\` of \`${one.page}\` is ${said(now)}, and the turn left it ${said(one.to)}, so taking the turn back would undo a change made since`
  }
  return null
}

function earlierOf(reach: Unplaying, played: Played): readonly Paged[] {
  return inOrder(reach.storyOf(played.game)).filter(
    (one) =>
      one.slug !== played.slug &&
      (one.closed === true || Number(one.value[POSITION] ?? 0) < played.position)
  )
}

function namedAt(address: string, path: string) {
  const cut = address.indexOf(PARTED)
  return { pageTypeSlug: address.slice(0, cut), slug: address.slice(cut + 1), path }
}

function placesBack(
  reach: Unplaying,
  played: Played,
  earlier: readonly Paged[]
): readonly Naming[] | Refused {
  const before = playedIn(earlier)
  if ("refused" in before) return before
  const opening = replayed(OPENING, before)
  if ("refused" in opening) return opening
  const own = { turn: played.slug, beats: played.beats.beats, scenes: played.beats.scenes }
  const end = replayed(opening, [own])
  if ("refused" in end) return end
  const namings: Naming[] = []
  for (const [character, place] of Object.entries(end.placeOf)) {
    const was = opening.placeOf[character]
    if (was === place) continue
    const at = reach.pathOf(character)
    if (at === null) return { refused: `\`${character}\`, whom the turn placed, is no page here` }
    const now = reach.valueOf(at)?.[PLACE]
    if (now !== place) {
      return {
        refused: `\`${character}\` is at ${said(now)}, and the turn left them at ${said(place)}, so taking the turn back would undo a move made since`,
      }
    }
    const prior = was ?? reach.valueBefore(at)?.[PLACE]
    const named = namedAt(character, at)
    namings.push(
      typeof prior === "string"
        ? { ...named, values: { [PLACE]: prior }, merge: true }
        : { ...named, values: {}, merge: true, clears: [PLACE] }
    )
  }
  return namings
}

type Fact = Readonly<Record<string, unknown>>

function factsIn(value: Value | null): readonly Fact[] {
  const facts = value?.[FACTS]
  return Array.isArray(facts) ? facts.filter(isRecord) : []
}

function knowersIn(fact: Fact | undefined): readonly string[] {
  const knowers = fact?.[KNOWERS]
  return Array.isArray(knowers) ? knowers.filter((one) => typeof one === "string") : []
}

type Kept = {
  readonly fact: (page: string, fact: string) => boolean
  readonly knower: (page: string, fact: string, knower: string) => boolean
}

export function memoryOf(story: readonly Paged[]): readonly Memory[] {
  return story.flatMap((one) =>
    one.beats === undefined || "refused" in one.beats ? [] : one.beats.memory
  )
}

function keptBy(memory: readonly Memory[]): Kept {
  return {
    fact: (page, fact) => memory.some((one) => one.page === page && one.fact === fact),
    knower: (page, fact, knower) =>
      memory.some((one) => one.page === page && one.fact === fact && one.learns === knower),
  }
}

function factBack(
  fact: Fact,
  ours: readonly Memory[],
  then: readonly Fact[],
  kept: Kept
): Fact | null {
  const text = fact[FACT]
  const mine = ours.filter((one) => one.fact === text)
  if (typeof text !== "string" || mine.length === 0) return fact
  const page = mine[0]?.page ?? ""
  const was = then.find((one) => one[FACT] === text)
  const held = was !== undefined || kept.fact(page, text)
  if (!held && mine.some((one) => one.establishes === true)) return null
  const taught = new Set(mine.flatMap((one) => (one.learns === undefined ? [] : [one.learns])))
  const prior = knowersIn(was)
  const knowers = knowersIn(fact).filter(
    (one) => !taught.has(one) || prior.includes(one) || kept.knower(page, text, one)
  )
  return { ...fact, [KNOWERS]: knowers }
}

export function loreBack(
  reach: Unplaying,
  memory: readonly Memory[],
  others: readonly Memory[]
): Unplayed | Refused {
  const look = {
    listedAt: reach.listedAt,
    valueAt: reach.valueOf,
    shaped: (_at: string, text: string) => text,
  }
  const byPath = new Map<string, Memory[]>()
  const report: string[] = []
  for (const one of memory) {
    if (one.shown === true) continue
    const at = tellerOf(one.page, one.fact, look)
    if (at === null) {
      report.push(`kept\t${one.page}\t${one.fact}\tno lore page tells it`)
      continue
    }
    byPath.set(at, [...(byPath.get(at) ?? []), one])
  }
  const kept = keptBy(others)
  const namings: Naming[] = []
  const removed: string[] = []
  for (const [at, ours] of byPath) {
    const value = reach.valueOf(at)
    const before = reach.valueBefore(at)
    const now = factsIn(value)
    const facts = now.flatMap((one) => {
      const back = factBack(one, ours, factsIn(before), kept)
      return back === null ? [] : [back]
    })
    if (jsonEqual(facts, now)) continue
    report.push(`taken back\t${at}\tfacts`)
    if (facts.length === 0 && before === null) {
      removed.push(at)
      continue
    }
    const slug = value?.[SLUG]
    const address = typeof slug === "string" ? `${typeOf(value)}${PARTED}${slug}` : ours[0]?.page
    namings.push({ ...namedAt(address ?? "", at), values: { [FACTS]: facts }, merge: true })
  }
  return { namings, rewritten: [], removed, report }
}

function typeOf(value: Value | null): string {
  const type = value?.[TYPE]
  return typeof type === "string" ? bareOf(type) : ""
}

export function mergedNamings(namings: readonly Naming[]): readonly Naming[] {
  const byPath = new Map<string, Naming>()
  const loose: Naming[] = []
  for (const one of namings) {
    if (one.path === undefined) {
      loose.push(one)
      continue
    }
    const had = byPath.get(one.path)
    if (had === undefined) {
      byPath.set(one.path, one)
      continue
    }
    const clears = [...(had.clears ?? []), ...(one.clears ?? [])].filter(
      (key) => !(key in one.values)
    )
    byPath.set(one.path, {
      ...had,
      values: { ...had.values, ...one.values },
      ...(clears.length === 0 ? {} : { clears }),
    })
  }
  return [...byPath.values(), ...loose]
}

export function turnUnplayed(reach: Unplaying, played: Played): Unplayed | Refused {
  const shown = shownOf(played.status, played.beats)
  const changes = played.beats.changes.filter((one) => one.beat <= shown)
  const moved = movedSince(changes, reach.beating)
  if (moved !== null) return { refused: moved }
  const unbeat = unbeaten(changes, shown, played.position, reach.beating)
  if ("refused" in unbeat) return unbeat
  const earlier = earlierOf(reach, played)
  const places = played.status === WORLD_BUILDER ? [] : placesBack(reach, played, earlier)
  if ("refused" in places) return places
  const told = played.status === BEATS || played.status === PLAYER ? played.beats.memory : []
  const lore = loreBack(reach, told, memoryOf(earlier))
  if ("refused" in lore) return lore
  return {
    namings: mergedNamings([...unbeat.namings, ...places, ...lore.namings]),
    rewritten: unbeat.rewritten,
    removed: [...unbeat.removed, ...lore.removed],
    report: [
      ...unbeat.report,
      ...places.map((one) => `placed back\t${one.path ?? one.slug}`),
      ...lore.report,
    ],
  }
}

function madeOf(root: string, turnAt: string): string | null {
  try {
    return addedLogged(root, turnAt)
  } catch {
    return null
  }
}

function bodyBefore(root: string, made: string | null, path: string): Value | null {
  if (made === null) return null
  try {
    const body = bodyCommitted(root, `${made}^`, path)
    return body === null ? null : valueIn(body)
  } catch {
    return null
  }
}

export function unplayingIndexed(root: string, turnAt: string): Unplaying {
  const held: { made?: string | null } = {}
  const made = (): string | null => {
    if (!("made" in held)) held.made = madeOf(root, turnAt)
    return held.made ?? null
  }
  return {
    beating: unbeatingIn(
      root,
      (within, path) => valueAt(path, within),
      (within, path) => readFileSync(join(within, path), TEXT)
    ),
    storyOf: (game) => storyIndexed(root, game, false),
    pathOf: (address) => pathOf(root, address),
    valueOf: (path) => valueAt(path, root),
    listedAt: (pageTypeSlug, slug) => listedAt(root, pageTypeSlug, slug),
    valueBefore: (path) => bodyBefore(root, made(), path),
  }
}

function derived(path: string): boolean {
  return referencesFiled(path) || shapesFiled(path)
}

export function besideListed(root: string, turn: string): readonly string[] {
  const folder = dirname(turn)
  const opening = `${turn.slice(folder.length + 1, -PAGE_ENDING.length)}.`
  return readdirSync(join(root, folder), { withFileTypes: true })
    .filter((one) => one.isFile() && one.name.startsWith(opening))
    .filter((one) => !one.name.includes(UNCOMMITTED))
    .map((one) => `${folder}/${one.name}`)
    .filter((one) => one !== turn && !derived(one))
}

export type Unplayable = {
  readonly besideOnDisk: (root: string, turn: string) => readonly string[]
  readonly unplayingOf: (root: string, turnAt: string) => Unplaying
}

export const UNPLAYED: Unplayable = { besideOnDisk: besideListed, unplayingOf: unplayingIndexed }
