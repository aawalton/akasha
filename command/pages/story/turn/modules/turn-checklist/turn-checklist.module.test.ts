import { expect, test } from "bun:test"
import {
  type Checking,
  checklistSaid,
} from "akasha/command/pages/story/turn/modules/turn-checklist/turn-checklist.module.code.ts"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"
import { NO_BEATS } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

const AT = "stories/saga/turns/saga-00-004.story-turn-played.ts"

const shown = (beat: number, event: string) => ({
  beat,
  event,
  changes: [],
  prose: `${event} Then quiet.`,
  memory: [],
  pictured: [],
})

const AT_BEATS = beatsOf(
  shown(1, "Mara opens the gate."),
  shown(2, "The hall is dark."),
  { beat: 3, event: "A lamp flares.", changes: [] },
  { beat: 4, event: "Someone speaks." }
)

const staff = (slug: string, name: string, kind: string) => ({
  slug,
  name,
  at: `story/${kind}/pages/${slug}.story-${kind}.ts`,
  instructionsAt: `story/${kind}/pages/${slug}.story-${kind}.instructions.md`,
})

const CHECKING: Checking = {
  prompting: {
    title: "The Saga",
    turnAt: AT,
    address: "story-turn-played/saga-00-004",
    calledAs: "akasha story turn advance",
    lore: [],
    written: [],
  },
  slug: "saga-00-004",
  status: "beats",
  flows: true,
  flow: AT_BEATS,
  reviewedBy: ["continuity"],
  recordedBy: [],
  reviewers: [staff("continuity", "Continuity", "reviewer"), staff("style", "Style", "reviewer")],
  recorders: ["mechanics", "memory", "picture"].map((one) => staff(one, one, "recorder")),
  mechanics: ["mechanics"],
  roles: {
    "world-builder": "agent/role/pages/world-builder.role.ts",
    writer: "agent/role/pages/writer.role.ts",
    "story-recorder": "agent/role/pages/story-recorder.role.ts",
    reviewer: "agent/role/pages/reviewer.role.ts",
  },
  notice: (step) => `The turn \`${AT}\` is at ${step}.`,
}

test("a turn at beats lists every step, beat by beat, and marks the next one from the beats file", () => {
  const said = checklistSaid(CHECKING)
  expect(said.split("\n").slice(0, 10)).toEqual([
    `The checklist of the turn \`${AT}\` of The Saga, at beats: [x] is done, [>] is the item to work now, [ ] is still to do. The turn reaches player once every item is done.`,
    "",
    "- [x] Lore: the world builder's step",
    "- [x] Beats: the game master's step",
    "- Beats 1 to 2: [x] numbers [x] prose [x] memory [x] pictures",
    "- Beat 3: [x] numbers [>] prose [ ] memory [ ] pictures",
    "- Beat 4: [ ] numbers [ ] prose [ ] memory [ ] pictures",
    "- [x] Review: Continuity",
    "- [ ] Review: Style",
    "",
  ])
  expect(said).toContain("Now: Beat 3: prose")
  expect(said).toContain(
    "For this item you hold the writer role: its role page is `agent/role/pages/writer.role.ts`."
  )
  expect(said).toContain("For this item, you are the writer of The Saga")
  expect(said).toContain("--turn story-turn-played/saga-00-004 --beat 3 --prose-file <path>")
  expect(said).toContain("its answer is the checklist's next item")
})

test("a refused beat is stated again before its numbers, as the game master's own item", () => {
  const refused = beatsOf(shown(1, "Mara opens the gate."), {
    beat: 2,
    event: "The hall is dark.",
    issues: ["no lamp is lit"],
  })
  const said = checklistSaid({ ...CHECKING, flow: refused })
  expect(said).toContain(
    "- Beat 2: [>] state it again [ ] numbers [ ] prose [ ] memory [ ] pictures"
  )
  expect(said).toContain("Now: Beat 2: state it again")
  expect(said).not.toContain("For this item you hold")
  expect(said).toContain("--beat 2 --beats-file <path>")
})

test("once every beat is shown and recorded, each review is an item that mends before it hands in", () => {
  const whole = beatsOf(shown(1, "Mara opens the gate."), shown(2, "The hall is dark."))
  const said = checklistSaid({ ...CHECKING, flow: whole })
  expect(said).toContain("- [>] Review: Style")
  expect(said).toContain("For this item you hold the reviewer role")
  expect(said).toContain("For this item, you are the Style story reviewer")
  expect(said).toContain("Mend each fault you find before you hand this review in")
  expect(said).toContain("--reviewer style --issues-file <path>")
})

test("a turn at world-builder starts at its lore, in the world builder's role, its beats still to come", () => {
  const said = checklistSaid({ ...CHECKING, status: "world-builder", flow: NO_BEATS })
  expect(said).toContain("- [>] Lore: the world builder's step")
  expect(said).toContain("- [ ] Each beat in turn: its numbers, prose, memory and pictures")
  expect(said).toContain("For this item you hold the world builder role")
  expect(said).toContain(`The turn \`${AT}\` is at world-builder.`)
  expect(said).toContain("--turn story-turn-played/saga-00-004 --lore <address>")
})

test("a turn sent back off the beats works its numbers, prose, records and reviews as its status says", () => {
  const back = { ...CHECKING, flows: false, flow: NO_BEATS, recordedBy: [], reviewedBy: [] }
  const gm = checklistSaid({
    ...back,
    status: "game-master",
    prompting: { ...CHECKING.prompting, repairs: [{ file: "x.issues.txt", faults: 1 }] },
  })
  expect(gm).toContain("- [>] Beats: the game master's step")
  expect(gm).toContain("--beats-file <path>")
  expect(gm).toContain("Add `--rulings-file <path>` where you rule an issue out")
  const writing = checklistSaid({ ...back, status: "writer", recordedBy: ["mechanics"] })
  expect(writing).toContain("- [x] Numbers: mechanics")
  expect(writing).toContain("- [>] Prose: the writer's step")
  expect(writing).toContain("--prose-file <path> --character <address>")
  const recording = checklistSaid({
    ...back,
    status: "recorders",
    recordedBy: ["mechanics", "memory"],
  })
  expect(recording).toContain("- [x] Record: memory")
  expect(recording).toContain("- [>] Record: picture")
  expect(recording).toContain("For this item, you are the picture story recorder")
})
