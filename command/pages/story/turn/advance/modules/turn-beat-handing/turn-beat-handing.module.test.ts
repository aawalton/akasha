import { expect, test } from "bun:test"
import {
  beatPrompt,
  flowingIn,
} from "akasha/command/pages/story/turn/advance/modules/turn-beat-handing/turn-beat-handing.module.code.ts"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"
import {
  statusOf,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const AT = "stories/saga/turns/saga-00-004.story-turn-played.ts"

const BEATS = beatsOf(
  { beat: 1, event: "Mara opens the gate.", changes: [] },
  { beat: 2, event: "The hall is dark." }
)

const RECORDERS = ["inventory", "mechanics", "memory", "picture", "plan"].map((slug) => ({
  slug,
  name: slug,
  at: `story/recorder/pages/${slug}.story-recorder.ts`,
  instructionsAt: `story/recorder/pages/${slug}.story-recorder.instructions.md`,
}))

const ASKED = {
  title: "The Saga",
  calledAs: "akasha story turn advance",
  turn: { slug: "saga-00-004", at: AT, beats: BEATS },
  beat: 2,
  recorders: RECORDERS,
  master: "iris-game-master-saga",
}

test("a beat's message names its turn and number and carries its line as the steps before left it", () => {
  const said = beatPrompt("changes", ASKED)
  expect(said).toContain(`Beat 2 of the turn \`${AT}\` is ready for you.`)
  expect(said).toContain(JSON.stringify({ beat: 2, event: "The hall is dark." }))
  expect(said).toContain(
    `akasha story turn advance --turn ${storyTurnPlayed.slug}/saga-00-004 --beat 2 --recorder mechanics --changes-file <path>`
  )
  expect(said).toContain("plan.story-recorder.instructions.md")
  expect(said).toContain("inventory.story-recorder.instructions.md")
})

test("the writer is asked for one beat's prose, and each recorder for its own part", () => {
  const prose = beatPrompt("prose", { ...ASKED, beat: 1 })
  expect(prose).toContain("--beat 1 --prose-file <path> --character <address>")
  expect(prose).toContain(JSON.stringify({ beat: 1, event: "Mara opens the gate.", changes: [] }))
  expect(beatPrompt("memory", ASKED)).toContain("--recorder memory --memory-file <path>")
  expect(beatPrompt("pictured", ASKED)).toContain("--recorder picture --pictured-file <path>")
})

test("a refused beat is handed to the game master with its issues, to state again from there", () => {
  const refused = beatsOf(
    { beat: 1, event: "Mara opens the gate.", changes: [] },
    { beat: 2, event: "The hall is dark.", issues: ["beat 2: no lamp is lit"] }
  )
  const said = beatPrompt("event", { ...ASKED, turn: { ...ASKED.turn, beats: refused } })
  expect(said).toContain("You are the game master of The Saga")
  expect(said).toContain("- beat 2: no lamp is lit")
  expect(said).toContain("saga-00-004.story-turn-played.beats.jsonl")
  expect(said).toContain("--beat 2 --beats-file <path>")
  expect(beatPrompt("changes", ASKED)).toContain("--issues-file")
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
