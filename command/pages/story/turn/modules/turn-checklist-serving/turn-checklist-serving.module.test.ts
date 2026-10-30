import { expect, test } from "bun:test"
import {
  checklistServed,
  type Serving,
} from "akasha/command/pages/story/turn/modules/turn-checklist-serving/turn-checklist-serving.module.code.ts"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"

const atOf = (slug: string) => `stories/saga/turns/${slug}.story-turn-played.ts`

const pagedOf = (slug: string, position: number, status: string) => ({
  slug,
  at: atOf(slug),
  value: { story: "story-played/saga", position, stepStatus: `step-status/${status}` },
  beats: beatsOf({ beat: 1, event: "Mara opens the gate." }),
})

const staff = (slug: string, kind: string) => ({
  slug,
  name: slug,
  at: `story/${kind}/pages/${slug}.story-${kind}.ts`,
  instructionsAt: `story/${kind}/pages/${slug}.story-${kind}.instructions.md`,
})

const servingOf = (turns: readonly ReturnType<typeof pagedOf>[]): Serving => ({
  reach: {
    storyOf: () => ({
      title: "The Saga",
      master: "iris-game-master-saga",
      oneSeat: true,
      intent: "Keep her kind.",
    }),
    reviewersIn: () => [staff("continuity", "reviewer")],
    recordersIn: () => ["mechanics", "memory", "picture"].map((one) => staff(one, "recorder")),
    loreGathered: () => ({ values: {}, named: [] }),
    writtenOn: () => [],
    changedLore: () => [],
  },
  turnsOf: () => turns,
  describedOf: () => [],
  crossedOf: () => ({
    turn: "saga-00-003",
    crossings: ["- `climb` for `mara`: level from 1 to 2"],
  }),
  rolePathOf: (_root, role) => `agent/role/pages/${role}.role.ts`,
  textOf: () => "",
})

const CALLED = "akasha story turn advance"

test("the checklist served is the earliest turn not at player, whatever turns wait after it", () => {
  const turns = [
    pagedOf("saga-00-005", 5, "world-builder"),
    pagedOf("saga-00-004", 4, "beats"),
    pagedOf("saga-00-003", 3, "player"),
  ]
  const said = checklistServed("/nowhere", "saga", CALLED, servingOf(turns))
  expect(said).toStartWith(
    `The checklist of the turn \`${atOf("saga-00-004")}\` of The Saga, at beats`
  )
  expect(said).toContain("Now: Beat 1: numbers")
  expect(said).toContain("--turn story-turn-played/saga-00-004 --beat 1 --recorder mechanics")
})

test("a turn at game-master is told as its game master is, crossings and the player's intent too", () => {
  const said = checklistServed(
    "/nowhere",
    "saga",
    CALLED,
    servingOf([pagedOf("saga-00-004", 4, "game-master")])
  )
  expect(said).toContain("Now: Beats: the game master's step")
  expect(said).toContain(`The turn \`${atOf("saga-00-004")}\` is at game-master.`)
  expect(said).toContain("level from 1 to 2")
  expect(said).toContain("Keep her kind.")
  expect(said).toContain("--turn story-turn-played/saga-00-004 --beats-file <path>")
})

test("a story whose every turn is at player has the seat end its turn", () => {
  const said = checklistServed(
    "/nowhere",
    "saga",
    CALLED,
    servingOf([pagedOf("saga-00-004", 4, "player")])
  )
  expect(said).toBe(
    "Every turn of The Saga is at player, so no item waits on this seat: end your turn, and the next turn's notice comes as a message."
  )
})
