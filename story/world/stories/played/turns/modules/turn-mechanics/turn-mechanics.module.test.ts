import { expect, test } from "bun:test"
import {
  heldAt,
  recordedBy,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"
import {
  type Mechanicked,
  mechanicked,
} from "akasha/story/world/stories/played/turns/modules/turn-mechanics/turn-mechanics.module.code.ts"

const STEPPED = ["mechanics", "inventory"]

const GAIN = {
  beat: 1,
  page: "metric-character/mara-xp",
  key: "value",
  from: 1,
  to: 2,
  note: "+1 XP",
}

const LATER = { ...GAIN, beat: 2, from: 2, to: 3 }

function doneOf(said: Mechanicked) {
  if ("refused" in said) throw new Error(said.refused)
  return said
}

test("a seat that is not the last adds its changes and keeps the turn at mechanics", () => {
  const handed = { kind: "record", recorder: "inventory", changes: [GAIN] } as const
  const said = doneOf(mechanicked(heldAt("mechanics", { beats: 2 }), handed, STEPPED))
  expect(said.next).toBe("mechanics")
  expect(said.values).toEqual({ recordedBy: [recordedBy("inventory")] })
  expect(said.changes).toEqual([GAIN])
})

test("every seat's changes merge in beat order", () => {
  const held = heldAt("mechanics", { beats: 2, recordedBy: ["inventory"], changes: [LATER] })
  const handed = { kind: "record", recorder: "mechanics", changes: [GAIN] } as const
  const said = doneOf(mechanicked(held, handed, STEPPED))
  expect(said.next).toBe("on")
  expect(said.changes).toEqual([GAIN, LATER])
})

test("issues from any seat send the turn back once every seat has handed in", () => {
  const issued = {
    kind: "record",
    recorder: "inventory",
    issues: ["beat 2 spends no draught"],
  } as const
  const first = doneOf(mechanicked(heldAt("mechanics", { beats: 2 }), issued, STEPPED))
  expect(first.next).toBe("mechanics")
  expect(first.values["mechanicsIssues"]).toBe("txt")
  expect(first.issues).toEqual(["beat 2 spends no draught"])
  const held = heldAt("mechanics", {
    beats: 2,
    recordedBy: ["inventory"],
    mechanicsIssues: ["beat 2 spends no draught"],
  })
  const last = doneOf(mechanicked(held, { kind: "record", recorder: "mechanics" }, STEPPED))
  expect(last.next).toBe("game-master")
  expect(last.values["mechanicsSentBack"]).toBe(true)
  expect(last.changes).toBeNull()
})

test("a turn mechanics sent back once goes on to its writer, carrying its issues forward", () => {
  const issues = ["beat 2 spends no draught"]
  const held = heldAt("mechanics", {
    beats: 2,
    recordedBy: ["inventory"],
    mechanicsIssues: issues,
    mechanicsSentBack: true,
  })
  const again = doneOf(mechanicked(held, { kind: "record", recorder: "mechanics" }, STEPPED))
  expect(again.next).toBe("on")
  expect([again.values["mechanicsIssues"], again.issues]).toEqual(["txt", null])
  expect(again.values["mechanicsSentBack"]).toBeUndefined()
})

test("a rerun holds no change from the run before, so its changes are the whole of them", () => {
  const again = mechanicked(
    heldAt("mechanics", { beats: 1, changes: [] }),
    {
      kind: "record",
      recorder: "mechanics",
      changes: [GAIN],
    },
    STEPPED
  )
  expect(doneOf(again).changes).toEqual([GAIN])
})

test("a change past the last beat, or an issue past a hundred characters, is refused", () => {
  const far = { kind: "record", recorder: "mechanics", changes: [LATER] } as const
  expect(mechanicked(heldAt("mechanics", { beats: 1 }), far, STEPPED)).toEqual({
    refused: "a change names beat 2, and the turn has 1 beats",
  })
  const long = { kind: "record", recorder: "mechanics", issues: ["x".repeat(101)] } as const
  const said = mechanicked(heldAt("mechanics", { beats: 1 }), long, STEPPED)
  expect("refused" in said ? said.refused : "").toContain("issue 1 runs to 101")
})
