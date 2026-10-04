import { expect, test } from "bun:test"
import {
  heldAt,
  recordedBy,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"
import {
  beatsRefused,
  changesMerged,
  issueOf,
  type Mechanicked,
  mechanicked,
  raisedAs,
  raiserOf,
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
  expect(last.changes).toBeNull()
})

test("mechanics sends a turn back every time issues remain, and on where none do", () => {
  const issues = ["beat 2 spends no draught"]
  const held = heldAt("mechanics", { beats: 2, recordedBy: ["inventory"], mechanicsIssues: issues })
  const again = doneOf(mechanicked(held, { kind: "record", recorder: "mechanics" }, STEPPED))
  expect(again.next).toBe("game-master")
  const clean = heldAt("mechanics", { beats: 2, recordedBy: ["inventory"] })
  const on = doneOf(mechanicked(clean, { kind: "record", recorder: "mechanics" }, STEPPED))
  expect(on.next).toBe("on")
})

test("a change handed in again just as the turn holds it is held once", () => {
  const held = heldAt("mechanics", { beats: 2, changes: [GAIN] })
  const again = { kind: "record", recorder: "mechanics", changes: [GAIN, LATER] } as const
  expect(doneOf(mechanicked(held, again, STEPPED)).changes).toEqual([GAIN, LATER])
  expect(changesMerged([GAIN], [GAIN])).toEqual([GAIN])
})

test("a reviewer's issue is kept opening on the reviewer that raised it", () => {
  const line = raisedAs("voice", "beat 3: the gate was locked")
  expect(line).toBe("voice: beat 3: the gate was locked")
  expect(raiserOf(line, ["continuity", "voice"])).toBe("voice")
  expect(raiserOf("beat 3: no one raised this", ["voice"])).toBeNull()
  expect(issueOf(line, ["voice"])).toBe("beat 3: the gate was locked")
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

function beatsOf(count: number): string[] {
  return Array.from({ length: count }, (_, at) => `beat ${at + 1}`)
}

test("a played turn holds however many beats the story needs, and a chapter a hundred", () => {
  const turn = heldAt("game-master")
  expect(beatsRefused(beatsOf(101), turn)).toBeNull()
  expect(beatsRefused(beatsOf(400), turn)).toBeNull()
  const chapter = heldAt("game-master", { noun: "chapter" })
  expect(beatsRefused(beatsOf(100), chapter)).toBeNull()
  expect(beatsRefused(beatsOf(101), chapter)).toContain("a chapter holds at most 100 beats")
})

test("a beat runs past a hundred characters whatever the beats' cap is", () => {
  const chapter = heldAt("game-master", { noun: "chapter" })
  expect(beatsRefused(["x".repeat(101)], chapter)).toContain("beat 1 runs to 101")
  expect(beatsRefused(["x".repeat(101)], heldAt("game-master"))).toContain("beat 1 runs to 101")
})

test("a played turn holds however many issues its mechanics finds, and a chapter a hundred", () => {
  const many = Array.from({ length: 101 }, (_, at) => `beat ${at + 1} fails`)
  const handed = { kind: "record", recorder: "mechanics", issues: many } as const
  const turn = mechanicked(heldAt("mechanics", { beats: 101 }), handed, STEPPED)
  expect("refused" in turn).toBe(false)
  const chapter = mechanicked(heldAt("mechanics", { beats: 101, noun: "chapter" }), handed, STEPPED)
  expect("refused" in chapter ? chapter.refused : "").toContain(
    "a chapter holds at most 100 issues"
  )
})
