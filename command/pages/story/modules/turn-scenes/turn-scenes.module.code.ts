import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { slugOf, textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { beats as beatsFile } from "akasha/story/chapter/properties/beats.file-property.ts"
import {
  type Beats,
  beatsIn,
  NO_BEATS,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  type BeatScene,
  OPENING,
  type Played,
  replayed,
  unnamedIn,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { characterPlace } from "akasha/story/world/characters/properties/character-place.relation-property.ts"
import { storyChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  admittedIndexed,
  typeOf,
  typesUnder,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  CHAPTER,
  type Handed,
  type Held,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { turnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const BEATS = exportedAs(beatsFile.propertySlug)

const TEXT = "utf8"

const ENDS_AT = exportedAs(turnEndsAt.propertySlug)

const PLACE = exportedAs(characterPlace.propertySlug)

const POSITION = "position"

const COLLECTIONS = "partOfCollections"

const STORY = "story"

const SLUG = "slug"

const PARTED = "/"

export type Turn = {
  readonly at: string
  readonly slug: string
  readonly value: Readonly<Record<string, unknown>>
}

export type Paged = {
  readonly slug: string
  readonly at?: string
  readonly value: Readonly<Record<string, unknown>>
  readonly beats?: Beats | Refused
  readonly closed?: true
}

export type Scened = {
  readonly values: Readonly<Record<string, unknown>>
  readonly namings: readonly Naming[]
}

type Refused = { readonly refused: string }

export type Knowing = {
  readonly character: (address: string) => boolean
  readonly place: (address: string) => boolean
}

export type Scening = (
  root: string,
  held: Held,
  turn: Turn,
  beats: readonly string[],
  scenes: readonly BeatScene[]
) => Scened | Refused

function positionOf(value: Readonly<Record<string, unknown>>): number {
  const at = value[POSITION]
  return typeof at === "number" ? at : 0
}

export function beatsHeld(turn: Turn, textOf: (path: string) => string): Beats | Refused {
  const ending = turn.value[BEATS]
  if (typeof ending !== "string") return NO_BEATS
  const at = besideAt(turn.at, beatsFile.propertySlug, ending)
  if (at === null) return NO_BEATS
  let text: string
  try {
    text = textOf(at)
  } catch {
    return NO_BEATS
  }
  const read = beatsIn(text)
  if (!("refused" in read)) return read
  return { refused: `the beats file beside \`${turn.at}\` does not read: ${read.refused}` }
}

export function playedOf(one: Paged): Played | Refused {
  const held = one.beats ?? NO_BEATS
  if ("refused" in held) return held
  const ends = one.value[ENDS_AT]
  return {
    turn: one.slug,
    beats: held.beats,
    scenes: held.scenes,
    endsAt: typeof ends === "string" ? ends : null,
  }
}

export function playedIn(story: readonly Paged[]): readonly Played[] | Refused {
  const played: Played[] = []
  for (const one of story) {
    const said = playedOf(one)
    if ("refused" in said) return said
    played.push(said)
  }
  return played
}

export function scenesSettled(
  story: readonly Paged[],
  turn: Turn,
  beats: readonly string[],
  scenes: readonly BeatScene[],
  knowing: Knowing,
  chapter: boolean
): Scened | Refused {
  const unnamed = unnamedIn(scenes, knowing.character, knowing.place)
  if (unnamed !== null) return { refused: unnamed }
  const at = positionOf(turn.value)
  const before = playedIn(
    inOrder(
      story.filter(
        (one) => one.slug !== turn.slug && (one.closed === true || positionOf(one.value) < at)
      )
    )
  )
  if ("refused" in before) return before
  const opening = replayed(OPENING, before)
  if ("refused" in opening) {
    return { refused: `the story's beats before this one do not replay: ${opening.refused}` }
  }
  const end = replayed(opening, [{ turn: turn.slug, beats, scenes }])
  if ("refused" in end) return end
  const timed = !chapter && end.at !== null && scenes.some((one) => one.at !== undefined)
  const namings = Object.keys(end.placeOf).map(
    (one): Naming => ({
      pageTypeSlug: typeOf(one),
      slug: slugOf(one),
      merge: true,
      values: { [PLACE]: end.placeOf[one] },
    })
  )
  return { values: timed ? { [ENDS_AT]: end.at } : {}, namings }
}

const UNSCENED: Scened = { values: {}, namings: [] }

export function scenedOf(
  scening: Scening,
  root: string,
  held: Held,
  turn: Turn,
  handed: Handed
): Scened | Refused {
  const scenes = handed.kind === "beats" ? (handed.scenes ?? []) : []
  if (handed.kind !== "beats" || scenes.length === 0) return UNSCENED
  return scening(root, held, turn, handed.beats, scenes)
}

type Folding = (root: string, naming: Naming) => readonly Asking[] | Refused

export function cachedOf(fold: Folding, root: string, scened: Scened): readonly Asking[] | Refused {
  const asking: Asking[] = []
  for (const one of scened.namings) {
    const folded = fold(root, one)
    if ("refused" in folded) return folded
    asking.push(...folded)
  }
  return asking
}

function pagedOf(root: string, type: string, owner: string, closed: boolean): readonly Paged[] {
  return valuesOfType(root, type).flatMap((one): readonly Paged[] => {
    const of = one.value[STORY]
    const named = [...stringsIn(one.value[COLLECTIONS]), ...(typeof of === "string" ? [of] : [])]
    const slug = textAt(one.value, SLUG)
    if (!named.includes(owner) || slug === null) return []
    const textOf = (path: string) => readFileSync(join(root, path), TEXT)
    const beats = beatsHeld({ at: one.path, slug, value: one.value }, textOf)
    return [{ slug, at: one.path, value: one.value, beats, ...(closed ? { closed } : {}) }]
  })
}

export function storyIndexed(root: string, game: string, chapter: boolean): readonly Paged[] {
  if (chapter)
    return pagedOf(root, storyChapterWritten.slug, `${storyWritten.slug}${PARTED}${game}`, false)
  const owner = `${storyPlayed.slug}${PARTED}${game}`
  return [
    ...pagedOf(root, storyChapterPlayed.slug, owner, true),
    ...pagedOf(root, storyTurnPlayed.slug, owner, false),
  ]
}

function rankOf(one: Paged): number {
  return one.closed === true ? 0 : 1
}

export function inOrder(story: readonly Paged[]): readonly Paged[] {
  return story.toSorted(
    (one, other) => rankOf(one) - rankOf(other) || positionOf(one.value) - positionOf(other.value)
  )
}

export function scenesIndexed(
  root: string,
  held: Held,
  turn: Turn,
  beats: readonly string[],
  scenes: readonly BeatScene[]
): Scened | Refused {
  const admitted = admittedIndexed(root)
  const places = typesUnder(root, place.slug)
  const knowing: Knowing = {
    character: (address) => admitted.types.includes(typeOf(address)) && admitted.filed(address),
    place: (address) =>
      places.includes(typeOf(address)) &&
      listedAt(root, typeOf(address), slugOf(address)).length > 0,
  }
  const chapter = held.noun === CHAPTER
  const story = storyIndexed(root, held.game, chapter)
  return scenesSettled(story, turn, beats, scenes, knowing, chapter)
}
