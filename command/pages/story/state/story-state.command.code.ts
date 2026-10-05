import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { jsonEqual } from "akasha/code/type/narrowing/modules/json-equal/json-equal.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { changesIndexed } from "akasha/command/pages/story/modules/turn-changes/turn-changes.module.code.ts"
import {
  inOrder,
  type Paged,
  playedIn,
  storyIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import { storyState as page } from "akasha/command/pages/story/state/story-state.command.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import type {
  BeatChange,
  Reading,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import {
  OPENING,
  replayed,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  bareOf,
  PLAYER,
  stepIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const NAMED = [storyArgument] as const

const PLACE = "place"

const FACTS = "facts"

const FACT = "fact"

const KNOWERS = "knowers"

const STATUS = "stepStatus"

const PARTED = "\t"

const ID = "id"

const TYPE = "type"

const SLUG = "slug"

const UNREVEALED = "unrevealed"

const CHARACTER = "character"

const CHARACTERS = "characters"

const REACHING: readonly string[] = [UNREVEALED, CHARACTER, CHARACTERS]

const PAGE_TYPE = `${pageType.slug}/`

const PLAYER_AT = `${characterPlayer.slug}/`

const SCRIPT = ".ts"

type Held = {
  readonly page: string
  readonly id: string
  readonly unrevealed: unknown
}

export type Story = {
  readonly turns: readonly Paged[]
  readonly changesOf: (one: Paged) => readonly BeatChange[]
  readonly memoryOf: (one: Paged) => readonly Memory[]
  readonly reading: Reading
  readonly held: readonly Held[]
}

function factOf(reading: Reading, memory: Memory): object | undefined {
  const facts = reading.valueOf(memory.page, FACTS)
  if (!Array.isArray(facts)) return undefined
  return facts.find(
    (one): one is object =>
      typeof one === "object" && one !== null && Reflect.get(one, FACT) === memory.fact
  )
}

function knows(reading: Reading, memory: Memory): boolean {
  const held = factOf(reading, memory)
  const knowers: unknown = held === undefined ? undefined : Reflect.get(held, KNOWERS)
  return Array.isArray(knowers) && knowers.includes(memory.learns)
}

function scenesSaid(story: Story, turns: readonly Paged[], drift: string[]): readonly string[] {
  const played = playedIn(turns)
  if ("refused" in played) return [`refused${PARTED}scenes${PARTED}${played.refused}`]
  const end = replayed(OPENING, played)
  if ("refused" in end) return [`refused${PARTED}scenes${PARTED}${end.refused}`]
  const lines = end.at === null ? [] : [`clock${PARTED}${end.at}`]
  for (const [character, place] of Object.entries(end.placeOf)) {
    lines.push(`place${PARTED}${character}${PARTED}${place}`)
    const found = story.reading.valueOf(character, PLACE)
    if (found !== place) {
      drift.push(
        `drift${PARTED}${character}${PARTED}${PLACE}${PARTED}${place}${PARTED}${String(found)}`
      )
    }
  }
  return lines
}

type Last = Map<string, { readonly page: string; readonly key: string; readonly to: unknown }>

function changesSaid(story: Story, one: Paged, last: Last, drift: string[]): undefined {
  for (const change of story.changesOf(one)) {
    if (change.key === undefined || change.append !== undefined || change.make !== undefined) {
      continue
    }
    const at = `${change.page}${PARTED}${change.key}`
    const was = last.get(at)
    if (was !== undefined && !jsonEqual(was.to ?? null, change.from ?? null)) {
      drift.push(`drift${PARTED}${at}${PARTED}changed outside the beats before ${one.slug}`)
    }
    last.set(at, { page: change.page, key: change.key, to: change.to ?? null })
  }
  return undefined
}

function memorySaid(story: Story, one: Paged, lines: string[], drift: string[]): undefined {
  for (const memory of story.memoryOf(one)) {
    const fact = `${memory.page}${PARTED}${memory.fact}`
    if (memory.shown === true || memory.establishes === true) {
      lines.push(`shown${PARTED}${one.slug}${PARTED}${fact}`)
      if (factOf(story.reading, memory) === undefined) {
        const act = memory.shown === true ? "shown" : "established"
        drift.push(`drift${PARTED}${fact}${PARTED}${act} in ${one.slug} and is no fact of its page`)
      }
    }
    if (memory.learns !== undefined && !knows(story.reading, memory)) {
      drift.push(
        `drift${PARTED}${fact}${PARTED}${memory.learns} learned it in ${one.slug} and is no knower`
      )
    }
  }
  return undefined
}

function reachedIn(story: Story, published: readonly Paged[]): ReadonlySet<string> {
  const reached = new Set<string>()
  for (const one of published) {
    for (const change of story.changesOf(one)) {
      if (change.make !== undefined || REACHING.includes(change.key ?? "")) reached.add(change.page)
    }
  }
  return reached
}

function idsOf(turns: readonly Paged[]): readonly string[] {
  return turns
    .flatMap((one) => {
      const id = one.value[ID]
      return typeof id === "string" ? [id] : []
    })
    .toSorted()
}

function heldSaid(story: Story, turns: readonly Paged[], published: readonly Paged[]) {
  const reached = reachedIn(story, published)
  const ids = idsOf(turns)
  const opening = ids[0] ?? null
  const drift: string[] = []
  for (const one of story.held) {
    if (ids.includes(one.id) || reached.has(one.page) || one.unrevealed === true) continue
    if (one.unrevealed === false) {
      drift.push(
        `drift${PARTED}${one.page}${PARTED}${UNREVEALED}${PARTED}shown, and no beat shows it`
      )
    } else if (opening !== null && one.id >= opening) {
      drift.push(`drift${PARTED}${one.page}${PARTED}there, and no beat makes it or hands it over`)
    }
  }
  return drift
}

export function stateLines(story: Story): readonly string[] {
  const drift: string[] = []
  const turns = inOrder(story.turns)
  const lines = [...scenesSaid(story, turns, drift)]
  const last: Last = new Map()
  const published = (each: Paged) => each.closed === true || stepIn(each.value[STATUS]) === PLAYER
  for (const one of turns.filter(published)) {
    changesSaid(story, one, last, drift)
    memorySaid(story, one, lines, drift)
  }
  drift.push(...heldSaid(story, turns, turns.filter(published)))
  for (const [at, value] of last) {
    lines.push(`value${PARTED}${at}${PARTED}${JSON.stringify(value.to)}`)
    const found = story.reading.valueOf(value.page, value.key) ?? null
    if (!jsonEqual(found, value.to)) {
      drift.push(
        `drift${PARTED}${at}${PARTED}${JSON.stringify(value.to)}${PARTED}${JSON.stringify(found)}`
      )
    }
  }
  const none = `drift${PARTED}none: the pages hold every value the beats reach`
  return [...lines, ...(drift.length === 0 ? [none] : drift)]
}

function namesPlayer(value: Readonly<Record<string, unknown>>): boolean {
  const one = value[CHARACTER]
  const many = value[CHARACTERS]
  const named = [...(typeof one === "string" ? [one] : []), ...(Array.isArray(many) ? many : [])]
  return named.some((each) => typeof each === "string" && each.startsWith(PLAYER_AT))
}

function heldIn(value: Readonly<Record<string, unknown>>): Held | null {
  const type = value[TYPE]
  const slug = value[SLUG]
  const id = value[ID]
  if (typeof type !== "string" || typeof slug !== "string" || typeof id !== "string") return null
  if (!namesPlayer(value)) return null
  const bare = type.startsWith(PAGE_TYPE) ? type.slice(PAGE_TYPE.length) : type
  return { page: `${bare}/${slug}`, id, unrevealed: value[UNREVEALED] }
}

function heldUnder(root: string, game: string, chapter: boolean): readonly Held[] {
  const owner = listedAt(root, chapter ? storyWritten.slug : storyPlayed.slug, game)[0]
  if (owner === undefined) return []
  const folder = dirname(owner.path)
  const names = readdirSync(join(root, folder), { recursive: true, encoding: "utf8" })
  return names.flatMap((name) => {
    if (!name.endsWith(SCRIPT)) return []
    const value = valueByPath(root, join(folder, name))
    const held = value === null ? null : heldIn(value)
    return held === null ? [] : [held]
  })
}

export function storyState(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const game = bareOf(read.taken.story.trim())
  const chapter = listedAt(given.root, storyWritten.slug, game).length > 0
  if (!chapter && listedAt(given.root, storyPlayed.slug, game).length === 0) {
    return refused(`\`${game}\` names no played or written story here`, DATA)
  }
  const heldOf = (one: Paged) =>
    one.beats === undefined || "refused" in one.beats ? null : one.beats
  return told(
    stateLines({
      turns: storyIndexed(given.root, game, chapter),
      changesOf: (one) => heldOf(one)?.changes ?? [],
      memoryOf: (one) => heldOf(one)?.memory ?? [],
      reading: changesIndexed(given.root),
      held: heldUnder(given.root, game, chapter),
    })
  )
}
