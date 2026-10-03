import { expect, test } from "bun:test"
import { editorAfter } from "akasha/story/world/stories/played/turns/modules/turn-editing/turn-editing.module.code.ts"
import type {
  Caller,
  Handed,
  Held,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  advanced,
  at,
  heldAt,
  MASTER,
  movedOf,
  PROSE,
  refusalOf,
  TWO,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"

const EDITED = { noun: "chapter", editorSteps: true } as const

const BEATS_CUT: Caller = { role: "beat-editor", game: "the-saga" }

const PROSE_CUT: Caller = { role: "prose-editor", game: "the-saga" }

const MECHANICS = ["mechanics"]

const BEATS = { kind: "beats", beats: ["a", "b"] } as const

function stepped(held: Held, caller: Caller, handed: Handed) {
  return advanced(held, caller, handed, TWO, [...MECHANICS, "cast"], [], undefined, MECHANICS)
}

test("an editor follows the game master's first beats and every writer's prose", () => {
  expect(editorAfter(heldAt("game-master", EDITED))).toBe("beat-editor")
  expect(editorAfter(heldAt("game-master", { ...EDITED, beats: 40 }))).toBeNull()
  expect(editorAfter(heldAt("writer", { ...EDITED, written: true }))).toBe("prose-editor")
  expect(editorAfter(heldAt("beat-editor", EDITED))).toBeNull()
  expect(editorAfter(heldAt("prose-editor", EDITED))).toBeNull()
})

test("no editor follows a story without editor steps, or a played turn", () => {
  expect(editorAfter(heldAt("game-master", { noun: "chapter" }))).toBeNull()
  expect(editorAfter(heldAt("writer", { editorSteps: true }))).toBeNull()
})

test("a chapter with editor steps goes game master, beat editor, then mechanics", () => {
  const first = movedOf(stepped(heldAt("game-master", EDITED), MASTER, BEATS))
  expect([first.status, first.starts, first.planned]).toEqual([
    "beat-editor",
    [],
    { beats: ["a", "b"], scenes: [] },
  ])
  const cutting = heldAt("beat-editor", { ...EDITED, beats: 2 })
  expect(refusalOf(stepped(cutting, MASTER, BEATS))).toContain("beat-editor")
  expect(movedOf(stepped(cutting, BEATS_CUT, BEATS)).status).toBe("mechanics")
})

test("a game master's mend of an edited chapter goes on past the beat editor", () => {
  const mended = heldAt("game-master", { ...EDITED, beats: 40 })
  expect(movedOf(stepped(mended, MASTER, BEATS)).status).toBe("mechanics")
})

test("a chapter with editor steps goes writer, prose editor, then on as the writer would", () => {
  const written = movedOf(stepped(heldAt("writer", EDITED), WRITER, PROSE))
  expect([written.status, written.starts]).toEqual(["prose-editor", []])
  const cut = { kind: "prose", prose: "Mara opens it.", characters: [] } as const
  const held = heldAt("prose-editor", { ...EDITED, recordedBy: MECHANICS })
  const on = movedOf(stepped(held, PROSE_CUT, cut))
  expect(on.status).toBe("recorders")
  expect(on.values).toEqual({ stepStatus: at("recorders"), prose: "txt", ownLength: 3 })
  expect(on.prose).toBe("Mara opens it.\n")
})
