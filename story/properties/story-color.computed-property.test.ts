import { expect, test } from "bun:test"
import { assignmentSlug } from "akasha/agent/properties/assignment-slug.one-of-property.ts"
import { ready } from "akasha/agent/seat/turn-state/pages/idle/ready/ready.seat-turn-state.ts"
import { stopped } from "akasha/agent/seat/turn-state/pages/stopped/stopped.seat-turn-state.ts"
import { working } from "akasha/agent/seat/turn-state/pages/working/working.seat-turn-state.ts"
import { seatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.ts"
import { partOfCollections } from "akasha/alan/collection/properties/part-of-collections.multi-relation-property.ts"
import { color } from "akasha/design/interface/color/color.page-type.ts"
import { green } from "akasha/design/interface/color/pages/green.color.ts"
import { red } from "akasha/design/interface/color/pages/red.color.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { chapterStory } from "akasha/story/chapter/properties/chapter-story.relation-property.ts"
import { work } from "akasha/story/properties/story-color.computed-property.code.ts"
import type { Story } from "akasha/story/story.page-type.types.ts"
import {
  GAME_MASTER,
  PLAYER,
  RECORDERS,
  statusOf,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const TURNS = partOfCollections.slug

const CHAPTERS = chapterStory.slug

const SEATS = assignmentSlug.propertySlug

const WORKING = namedAs(color.slug, green.slug, null)

const WAITING = namedAs(color.slug, red.slug, null)

type Row = {
  readonly position?: number
  readonly stepStatus?: string
  readonly turnState?: string
}

function seatIn(state: string): Row {
  return { turnState: namedAs(seatTurnState.slug, state, null) }
}

const SEAT_WORKING = seatIn(working.slug)

const SEAT_READY = seatIn(ready.slug)

const SEAT_STOPPED = seatIn(stopped.slug)

function story(slug: string): Story {
  return { id: "01a06425-4433-7452-bd78-2410fa95fb44", slug, title: slug }
}

function reachOver(named: Readonly<Record<string, readonly Row[]>>): Reach {
  return {
    target: () => null,
    through: () => null,
    naming: <Found>(propertySlug: string) => (named[propertySlug] ?? []) as readonly Found[],
    file: () => null,
    folder: () => null,
  }
}

const PLAYED = story("the-tower")

const WRITTEN = story("harem-hotel")

test("a played story whose open turn is mid-step is drawn in the working color", () => {
  const reach = reachOver({
    [TURNS]: [
      { position: 80, stepStatus: statusOf(PLAYER) },
      { position: 81, stepStatus: statusOf(WRITER) },
    ],
    [SEATS]: [SEAT_READY, SEAT_WORKING],
  })

  expect(work(PLAYED, reach)).toBe(WORKING)
})

test("a played story whose game master step no seat is working draws no color", () => {
  const reach = reachOver({
    [TURNS]: [
      { position: 12, stepStatus: statusOf(PLAYER) },
      { position: 13, stepStatus: statusOf(GAME_MASTER) },
    ],
    [SEATS]: [SEAT_READY, SEAT_READY, SEAT_READY],
  })

  expect(work(PLAYED, reach)).toBeNull()
})

test("a played story whose only seat on its step has stopped draws no color", () => {
  const reach = reachOver({
    [TURNS]: [{ position: 81, stepStatus: statusOf(RECORDERS) }],
    [SEATS]: [SEAT_READY, SEAT_STOPPED],
  })

  expect(work(PLAYED, reach)).toBeNull()
})

test("a played story whose step's seat has gone draws no color", () => {
  const reach = reachOver({ [TURNS]: [{ position: 81, stepStatus: statusOf(RECORDERS) }] })

  expect(work(PLAYED, reach)).toBeNull()
})

test("a played story whose open turn waits on Alan is drawn in the waiting color", () => {
  const reach = reachOver({ [TURNS]: [{ position: 89, stepStatus: statusOf(PLAYER) }] })

  expect(work(PLAYED, reach)).toBe(WAITING)
})

test("a played story whose open turn states no step status is drawn as work in flight", () => {
  const reach = reachOver({ [TURNS]: [{ position: 4 }], [SEATS]: [SEAT_WORKING] })

  expect(work(PLAYED, reach)).toBe(WORKING)
})

test("a played story whose game master is working its step is drawn in the working color", () => {
  const reach = reachOver({
    [TURNS]: [{ position: 90, stepStatus: statusOf(GAME_MASTER) }],
    [SEATS]: [SEAT_WORKING],
  })

  expect(work(PLAYED, reach)).toBe(WORKING)
})

test("a written story whose chapter is mid-step is drawn in the working color", () => {
  const reach = reachOver({
    [CHAPTERS]: [
      { position: 4, stepStatus: statusOf(PLAYER) },
      { position: 5, stepStatus: statusOf(RECORDERS) },
    ],
    [SEATS]: [SEAT_WORKING],
  })

  expect(work(WRITTEN, reach)).toBe(WORKING)
})

test("a written story whose chapter step no seat is working draws no color", () => {
  const reach = reachOver({
    [CHAPTERS]: [{ position: 5, stepStatus: statusOf(RECORDERS) }],
    [SEATS]: [SEAT_STOPPED],
  })

  expect(work(WRITTEN, reach)).toBeNull()
})

test("a written story whose chapter has published draws no color", () => {
  const reach = reachOver({ [CHAPTERS]: [{ position: 5, stepStatus: statusOf(PLAYER) }] })

  expect(work(WRITTEN, reach)).toBeNull()
})

test("a written story whose next chapter has not been started draws no color", () => {
  const reach = reachOver({ [CHAPTERS]: [{ position: 5 }, { position: 6 }] })

  expect(work(WRITTEN, reach)).toBeNull()
})

test("a story holding no turn and no chapter draws no color", () => {
  expect(work(story("a-fresh-story"), reachOver({}))).toBeNull()
})
