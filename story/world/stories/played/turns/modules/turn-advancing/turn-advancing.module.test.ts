import { expect, test } from "bun:test"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import type { Caller } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  advanced,
  at,
  BUILDER,
  by,
  CAST,
  heldAt,
  MASTER,
  movedOf,
  PROSE,
  RECORDER,
  REVIEWER,
  recordedBy,
  refusalOf,
  TWO,
  VOICE,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"

test("the world builder hands in the lore it landed and the turn goes to the game master", () => {
  const said = movedOf(
    advanced(heldAt("world-builder"), BUILDER, { kind: "lore", lore: ["lore/a-hall"] }, TWO)
  )
  expect(said.status).toBe("game-master")
  expect(said.values).toEqual({ stepStatus: at("game-master"), lore: ["lore/a-hall"] })
  expect(said.starts).toEqual([])
  expect(said.stopsCaller).toBe(false)
  expect(said.landsKept).toBe(false)
})

test("the world builder's lore may be a place, and a page of no lore type is refused", () => {
  const placed = { kind: "lore", lore: ["place/a-hall"] } as const
  expect(movedOf(advanced(heldAt("world-builder"), BUILDER, placed, TWO)).status).toBe(
    "game-master"
  )
  const character = { kind: "lore", lore: ["character-other/ceri"] } as const
  expect(refusalOf(advanced(heldAt("world-builder"), BUILDER, character, TWO))).toContain(
    "character-other/ceri"
  )
})

test("the world builder may hand in no lore", () => {
  const said = movedOf(advanced(heldAt("world-builder"), BUILDER, { kind: "lore", lore: [] }, TWO))
  expect(said.values).toEqual({ stepStatus: at("game-master") })
})

test("the game master's beats go to the writer, starting no seat and stopping none", () => {
  const beats = ["Mara opens the gate", "The hall is dark"]
  const said = movedOf(advanced(heldAt("game-master"), MASTER, { kind: "beats", beats }, TWO))
  expect(said.status).toBe("writer")
  expect(said.values).toEqual({ stepStatus: at("writer"), beats })
  expect(said.starts).toEqual([])
  expect(said.stopsCaller).toBe(false)
})

test("the game master's mended beats after review go to the writer too", () => {
  const held = heldAt("game-master", { reviewedBy: TWO, issues: ["a fault"], written: true })
  const said = movedOf(advanced(held, MASTER, { kind: "beats", beats: ["mended"] }, TWO))
  expect(said.status).toBe("writer")
  expect(said.starts).toEqual([])
})

test("a reviewer that is not the last adds itself and its issues and leaves the turn with the reviewers", () => {
  const found = { kind: "review", reviewer: VOICE, issues: ['"opens" - it was locked'] } as const
  const said = movedOf(advanced(heldAt("reviewers"), REVIEWER, found, TWO))
  expect(said.status).toBe("reviewers")
  expect(said.values).toEqual({
    stepStatus: at("reviewers"),
    reviewedBy: [by(VOICE)],
    issues: ['"opens" - it was locked'],
  })
  expect(said.starts).toEqual([])
  expect(said.stopsCaller).toBe(true)
})

test("the last reviewer sends a turn with issues back to the game master", () => {
  const held = heldAt("reviewers", { reviewedBy: [VOICE], issues: ["an earlier fault"] })
  const found = { kind: "review", reviewer: continuity.slug, issues: [] } as const
  const said = movedOf(advanced(held, REVIEWER, found, TWO))
  expect(said.status).toBe("game-master")
  expect(said.values).toEqual({
    stepStatus: at("game-master"),
    reviewedBy: [by(VOICE), by(continuity.slug)],
    issues: ["an earlier fault"],
  })
  expect(said.stopsCaller).toBe(true)
})

test("the last reviewer sends a written turn with no issues on to the recorders, starting each", () => {
  const held = heldAt("reviewers", { reviewedBy: [VOICE], written: true })
  const found = { kind: "review", reviewer: continuity.slug, issues: [] } as const
  const said = movedOf(advanced(held, REVIEWER, found, TWO))
  expect(said.status).toBe("recorders")
  expect(said.values).toEqual({
    stepStatus: at("recorders"),
    reviewedBy: [by(VOICE), by(continuity.slug)],
  })
  expect(said.prose).toBeNull()
  expect(said.starts).toEqual([
    { kind: "recorder", recorder: memory.slug },
    { kind: "recorder", recorder: CAST },
  ])
  expect(said.stopsCaller).toBe(true)
  expect(said.landsKept).toBe(false)
})

test("with no story recorder the last clean reviewer sends the turn to the player", () => {
  const held = heldAt("reviewers", { reviewedBy: [VOICE], written: true })
  const found = { kind: "review", reviewer: continuity.slug, issues: [] } as const
  const said = movedOf(advanced(held, REVIEWER, found, TWO, []))
  expect(said.status).toBe("player")
  expect(said.starts).toEqual([])
  expect(said.landsKept).toBe(false)
})

test("a clean review of a turn with no prose yet sends it to the writer", () => {
  const held = heldAt("reviewers", { reviewedBy: [VOICE] })
  const found = { kind: "review", reviewer: continuity.slug, issues: [] } as const
  const said = movedOf(advanced(held, REVIEWER, found, TWO))
  expect(said.status).toBe("writer")
  expect(said.starts).toEqual([])
})

test("a reviewer reviews a turn once", () => {
  const held = heldAt("reviewers", { reviewedBy: [VOICE] })
  const found = { kind: "review", reviewer: VOICE, issues: [] } as const
  expect(refusalOf(advanced(held, REVIEWER, found, TWO))).toContain("reviewed once")
})

test("a reviewer no page names is refused", () => {
  const found = { kind: "review", reviewer: "taste", issues: [] } as const
  expect(refusalOf(advanced(heldAt("reviewers"), REVIEWER, found, TWO))).toContain("taste")
})

test("the writer's first prose moves the turn to the reviewers, starting one seat for each", () => {
  const said = movedOf(advanced(heldAt("writer"), WRITER, PROSE, TWO))
  expect(said.status).toBe("reviewers")
  expect(said.prose).toBe("Mara opens the gate.\n")
  expect(said.values).toEqual({
    stepStatus: at("reviewers"),
    prose: "txt",
    ownLength: 4,
    characters: ["character-player/mara", "character-other/ceri"],
  })
  expect(said.starts).toEqual([
    { kind: "reviewer", reviewer: continuity.slug },
    { kind: "reviewer", reviewer: VOICE },
  ])
  expect(said.stopsCaller).toBe(false)
  expect(said.landsKept).toBe(false)
})

test("the writer's prose on a reviewed turn skips the reviewers for the recorders", () => {
  const held = heldAt("writer", { reviewedBy: TWO, issues: ["a fault"], written: true })
  const said = movedOf(advanced(held, WRITER, PROSE, TWO))
  expect(said.status).toBe("recorders")
  expect(said.prose).toBe("Mara opens the gate.\n")
  expect(said.starts).toEqual([
    { kind: "recorder", recorder: memory.slug },
    { kind: "recorder", recorder: CAST },
  ])
  expect(said.stopsCaller).toBe(false)
})

test("with no story reviewer the writer's prose goes to the recorders, or to the player with none", () => {
  expect(movedOf(advanced(heldAt("writer"), WRITER, PROSE, [])).status).toBe("recorders")
  const said = movedOf(advanced(heldAt("writer"), WRITER, PROSE, [], []))
  expect(said.status).toBe("player")
  expect(said.values["stepStatus"]).toBe(at("player"))
  expect(said.starts).toEqual([])
  expect(said.landsKept).toBe(false)
})

test("a turn with issues goes game master, writer, then recorders, and is reviewed once", () => {
  const found = { kind: "review", reviewer: continuity.slug, issues: ["a fault"] } as const
  const reviewed = { reviewedBy: TWO, issues: ["a fault"], written: true }
  const back = movedOf(
    advanced(heldAt("reviewers", { ...reviewed, reviewedBy: [VOICE] }), REVIEWER, found, TWO)
  )
  expect(back.status).toBe("game-master")
  const beats = { kind: "beats", beats: ["mended"] } as const
  const mended = movedOf(advanced(heldAt(back.status, reviewed), MASTER, beats, TWO))
  expect(mended.status).toBe("writer")
  const rewritten = movedOf(advanced(heldAt(mended.status, reviewed), WRITER, PROSE, TWO))
  expect(rewritten.status).toBe("recorders")
  expect(rewritten.starts.map((one) => one.kind)).toEqual(["recorder", "recorder"])
})

test("a recorder that is not the last names itself, keeps the turn with the recorders and lands its own edits", () => {
  const said = movedOf(
    advanced(heldAt("recorders"), RECORDER, { kind: "record", recorder: CAST }, TWO)
  )
  expect(said.status).toBe("recorders")
  expect(said.values).toEqual({ stepStatus: at("recorders"), recordedBy: [recordedBy(CAST)] })
  expect(said.starts).toEqual([])
  expect(said.stopsCaller).toBe(true)
  expect(said.landsKept).toBe(true)
})

test("the last recorder moves the turn to the player, landing its own edits", () => {
  const held = heldAt("recorders", { recordedBy: [CAST] })
  const said = movedOf(advanced(held, RECORDER, { kind: "record", recorder: memory.slug }, TWO))
  expect(said.status).toBe("player")
  expect(said.values).toEqual({
    stepStatus: at("player"),
    recordedBy: [recordedBy(CAST), recordedBy(memory.slug)],
  })
  expect(said.stopsCaller).toBe(true)
  expect(said.landsKept).toBe(true)
})

test("a recorder records a turn once, and a recorder no page names is refused", () => {
  const held = heldAt("recorders", { recordedBy: [CAST] })
  const again = { kind: "record", recorder: CAST } as const
  expect(refusalOf(advanced(held, RECORDER, again, TWO))).toContain("recorded once")
  const unknown = { kind: "record", recorder: "taste" } as const
  expect(refusalOf(advanced(heldAt("recorders"), RECORDER, unknown, TWO))).toContain("taste")
})

test("only a story recorder seat of the game advances a turn at recorders", () => {
  const record = { kind: "record", recorder: memory.slug } as const
  expect(refusalOf(advanced(heldAt("recorders"), WRITER, record, TWO))).toContain("story-recorder")
  expect(refusalOf(advanced(heldAt("recorders"), RECORDER, PROSE, TWO))).toContain("--recorder")
})

test("an advance from a seat not holding the status is refused", () => {
  const beats = { kind: "beats", beats: ["a"] } as const
  expect(refusalOf(advanced(heldAt("world-builder"), MASTER, beats, TWO))).toContain(
    "world-builder"
  )
  const other: Caller = { role: "game-master", game: "another-saga" }
  expect(refusalOf(advanced(heldAt("game-master"), other, beats, TWO))).toContain("another-saga")
  const nobody: Caller = { role: null, game: null }
  expect(refusalOf(advanced(heldAt("game-master"), nobody, beats, TWO))).toContain("no seat")
})

test("an advance handing in the wrong step's output is refused", () => {
  const lore = { kind: "lore", lore: [] } as const
  expect(refusalOf(advanced(heldAt("game-master"), MASTER, lore, TWO))).toContain("--beats-file")
  const prose = { kind: "prose", prose: "words", characters: [] } as const
  expect(refusalOf(advanced(heldAt("reviewers"), REVIEWER, prose, TWO))).toContain("--reviewer")
})

test("a turn at the player advances no further", () => {
  const lore = { kind: "lore", lore: [] } as const
  expect(refusalOf(advanced(heldAt("player"), BUILDER, lore, TWO))).toContain("next action")
})

test("beats past a hundred characters, or no beats, are refused", () => {
  const beats = ["x".repeat(102), "Mara opens the gate", "x".repeat(101)]
  const said = refusalOf(advanced(heldAt("game-master"), MASTER, { kind: "beats", beats }, TWO))
  expect(said).toContain("beat 1 runs to 102, beat 3 runs to 101")
  expect(said).not.toContain("x".repeat(101))
  const none = { kind: "beats", beats: [] } as const
  expect(refusalOf(advanced(heldAt("game-master"), MASTER, none, TWO))).toContain("none")
})

test("empty prose, and a character named by no address, are refused", () => {
  const empty = { kind: "prose", prose: " \n", characters: [] } as const
  expect(refusalOf(advanced(heldAt("writer"), WRITER, empty, TWO))).toContain("none")
  const bare = { kind: "prose", prose: "words", characters: ["mara"] } as const
  expect(refusalOf(advanced(heldAt("writer"), WRITER, bare, TWO))).toContain("mara")
})

test("prose naming a character of the story its advance leaves out is refused, turn or chapter", () => {
  const cast = [{ address: "character-other/ceri", title: "Ceri", aliasOf: null }]
  const named = { ...PROSE, prose: "Mara meets Ceri.", characters: ["character-player/mara"] }
  const chapter = heldAt("writer", { noun: "chapter" })
  for (const held of [heldAt("writer"), chapter]) {
    const said = refusalOf(advanced(held, WRITER, named, TWO, undefined, cast))
    expect(said).toContain("character-other/ceri")
    expect(movedOf(advanced(held, WRITER, PROSE, TWO, undefined, cast)).status).toBe("reviewers")
  }
})
