import { expect, test } from "bun:test"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"
import type {
  Held,
  Moved,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  advanced,
  heldAt,
  MASTER,
  movedOf,
  PROSE,
  RECORDER,
  refusalOf,
  TWO,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"

const SHOWN = beatsOf(
  { beat: 1, event: "One.", changes: [], prose: "One told." },
  { beat: 2, event: "Two.", changes: [], prose: "Two told." }
)

const FACT = {
  beat: 2,
  page: "lore/the-mere",
  fact: "The mere is deep.",
  learns: "character-player/mara",
}

function owing(more: Partial<Held> = {}): Held {
  const at = { flow: SHOWN, beats: 2, reviewedBy: TWO }
  return heldAt("player", { ...at, oneSeat: true, memoryOwed: true, ...more })
}

function remembering(memory: readonly (typeof FACT)[] = []) {
  return { kind: "record", recorder: "memory", memory } as const
}

test("a one-seat turn owing its memory takes it once, filling every beat no line names", () => {
  const said = movedOf(advanced(owing(), MASTER, remembering([FACT]), TWO))
  expect(said.status).toBe("player")
  expect("memoryOwed" in said.values && said.values["memoryOwed"] === undefined).toBe(true)
  expect(said.flow?.memory).toEqual([FACT])
  const unremembered = (flow: Moved["flow"]) => flow?.none?.filter((one) => one.part === "memory")
  expect(unremembered(said.flow)).toEqual([{ beat: 1, part: "memory" }])
  expect(said.landsKept).toBe(true)
  const empty = movedOf(advanced(owing(), MASTER, remembering(), TWO))
  expect(unremembered(empty.flow)).toEqual([
    { beat: 1, part: "memory" },
    { beat: 2, part: "memory" },
  ])
})

test("a picture, a beat named, a far beat or any other part is refused at player", () => {
  const picture = { kind: "record", recorder: "picture" } as const
  expect(refusalOf(advanced(owing(), MASTER, picture, TWO))).toContain("has no pictures")
  const named = { ...remembering([FACT]), beat: 2 }
  expect(refusalOf(advanced(owing(), MASTER, named, TWO))).toContain("naming no `--beat`")
  const far = remembering([{ ...FACT, beat: 3 }])
  expect(refusalOf(advanced(owing(), MASTER, far, TWO))).toContain("names beat 3")
  expect(refusalOf(advanced(owing(), MASTER, PROSE, TWO))).toContain("takes that memory alone")
})

test("the memory comes from the game master seat, and a turn owing none takes nothing", () => {
  expect(refusalOf(advanced(owing(), RECORDER, remembering([FACT]), TWO))).toContain(
    "waits on the game-master"
  )
  const remembered = owing({ memoryOwed: false })
  expect(refusalOf(advanced(remembered, MASTER, remembering([FACT]), TWO))).toContain(
    "only the player's next action"
  )
  const graph = heldAt("player", { flow: SHOWN, beats: 2 })
  expect(refusalOf(advanced(graph, RECORDER, remembering([FACT]), TWO))).toContain(
    "only the player's next action"
  )
})
