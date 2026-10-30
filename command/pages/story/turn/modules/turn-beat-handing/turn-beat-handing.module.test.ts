import { expect, test } from "bun:test"
import {
  flowingIn,
  notesSaid,
  rememberedNow,
  seatPartOf,
  waitingAfter,
} from "akasha/command/pages/story/turn/modules/turn-beat-handing/turn-beat-handing.module.code.ts"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"
import {
  statusOf,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const AT = "stories/saga/turns/saga-00-004.story-turn-played.ts"

const BEATS = beatsOf(
  { beat: 1, event: "Mara opens the gate.", changes: [] },
  { beat: 2, event: "The hall is dark." }
)

test("a seat's step is read off its role, and a story recorder's off its flex number", () => {
  const slugs = ["inventory", "mechanics", "memory", "picture", "plan"]
  const seat = (name: string, role: string) => ({ name, role, game: "saga" })
  expect(seatPartOf(seat("iris-writer-saga", "writer"), "iris", slugs)).toBe("prose")
  expect(seatPartOf(seat("iris-game-master-saga", "game-master"), "iris", slugs)).toBe("event")
  const numbers = seat("iris-story-recorder-saga-flex-2", "story-recorder")
  expect(seatPartOf(numbers, "iris", slugs)).toBe("changes")
  const pictures = seat("iris-story-recorder-saga-flex-4", "story-recorder")
  expect(seatPartOf(pictures, "iris", slugs)).toBe("pictured")
  const plans = seat("iris-story-recorder-saga-flex-5", "story-recorder")
  expect(seatPartOf(plans, "iris", slugs)).toBeNull()
})

test("the turn waiting behind one whose memory just finished is the next one, at world-builder", () => {
  const told = beatsOf({ beat: 1, event: "One.", changes: [], prose: "One.", memory: [] })
  const untold = beatsOf({ beat: 1, event: "One.", changes: [], prose: "One." })
  expect(rememberedNow(untold, told)).toBe(true)
  expect(rememberedNow(told, told)).toBe(false)
  const paged = (slug: string, position: number, status: TurnStep) => ({
    slug,
    at: `stories/saga/turns/${slug}.story-turn-played.ts`,
    value: { position, stepStatus: statusOf(status) },
  })
  const waiting = paged("saga-00-005", 5, "world-builder")
  const story = [waiting, paged("saga-00-004", 4, "beats")]
  expect(waitingAfter(story, "saga-00-004")).toBe(waiting.at)
  expect(waitingAfter([paged("saga-00-004", 4, "beats")], "saga-00-004")).toBeNull()
})

test("a reviewer's notes say the turn is never written again, and are heeded in the turns to come", () => {
  const said = notesSaid(AT, ["beat 2: too quick"])
  expect(said).toContain(`\`${AT}\``)
  expect(said).toContain("Mend nothing in that turn")
  expect(said).toContain("- beat 2: too quick")
})

test("the turns flowing are those at beats and the turn handed in, in turn order", () => {
  const paged = (slug: string, position: number, status: TurnStep) => ({
    slug,
    at: `stories/saga/turns/${slug}.story-turn-played.ts`,
    value: { position, stepStatus: statusOf(status) },
    beats: BEATS,
  })
  const story = [
    paged("saga-00-005", 5, "game-master"),
    paged("saga-00-004", 4, "player"),
    paged("saga-00-003", 3, "beats"),
    paged("saga-00-002", 2, "player"),
  ]
  expect(flowingIn(story, "saga-00-004").map((one) => one.slug)).toEqual([
    "saga-00-003",
    "saga-00-004",
  ])
})
