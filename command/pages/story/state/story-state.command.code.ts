import { readFileSync } from "node:fs"
import { join } from "node:path"
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
import {
  changesHeld,
  changesIndexed,
} from "akasha/command/pages/story/modules/turn-changes/turn-changes.module.code.ts"
import { memoryHeld } from "akasha/command/pages/story/modules/turn-memory/turn-memory.module.code.ts"
import {
  inOrder,
  type Paged,
  playedOf,
  storyIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import { storyState as page } from "akasha/command/pages/story/state/story-state.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type {
  BeatChange,
  Reading,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import {
  OPENING,
  replayed,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
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

const UTF8 = "utf8"

const PARTED = "\t"

export type Story = {
  readonly turns: readonly Paged[]
  readonly changesOf: (one: Paged) => readonly BeatChange[]
  readonly memoryOf: (one: Paged) => readonly Memory[]
  readonly reading: Reading
}

function knows(reading: Reading, memory: Memory): boolean {
  const facts = reading.valueOf(memory.page, FACTS)
  if (!Array.isArray(facts)) return false
  return facts.some((one) => {
    if (typeof one !== "object" || one === null || Reflect.get(one, FACT) !== memory.fact)
      return false
    const knowers: unknown = Reflect.get(one, KNOWERS)
    return Array.isArray(knowers) && knowers.includes(memory.learns)
  })
}

function scenesSaid(story: Story, turns: readonly Paged[], drift: string[]): readonly string[] {
  const end = replayed(OPENING, turns.map(playedOf))
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
    }
    if (memory.learns !== undefined && !knows(story.reading, memory)) {
      drift.push(
        `drift${PARTED}${fact}${PARTED}${memory.learns} learned it in ${one.slug} and is no knower`
      )
    }
  }
  return undefined
}

export function stateLines(story: Story): readonly string[] {
  const drift: string[] = []
  const turns = inOrder(story.turns)
  const lines = [...scenesSaid(story, turns, drift)]
  const last: Last = new Map()
  for (const one of turns.filter((each) => stepIn(each.value[STATUS]) === PLAYER)) {
    changesSaid(story, one, last, drift)
    memorySaid(story, one, lines, drift)
  }
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

export function storyState(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const game = bareOf(read.taken.story.trim())
  const chapter = listedAt(given.root, storyWritten.slug, game).length > 0
  if (!chapter && listedAt(given.root, storyPlayed.slug, game).length === 0) {
    return refused(`\`${game}\` names no played or written story here`, DATA)
  }
  const textOf = (path: string) => readFileSync(join(given.root, path), UTF8)
  const turnOf = (one: Paged) => ({ at: one.at ?? "", slug: one.slug, value: one.value })
  return told(
    stateLines({
      turns: storyIndexed(given.root, game, chapter),
      changesOf: (one) => changesHeld(turnOf(one), textOf),
      memoryOf: (one) => memoryHeld(turnOf(one), textOf),
      reading: changesIndexed(given.root),
    })
  )
}
