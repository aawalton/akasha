import { expect, test } from "bun:test"
import { taken } from "akasha/command/pages/story/turn/advance/modules/turn-handing/turn-handing.module.code.ts"

const CALLED = "akasha story turn advance"

const ROOT = "/var/tmp/turn-handing-test-nowhere"

const SLUG = "the-saga-00-003"

test("an advance handing in two steps' output is refused before anything is read", () => {
  const read = taken(
    ["--turn", SLUG, "--beats-file", "nowhere.txt", "--prose-file", "nowhere.txt"],
    CALLED,
    ROOT
  )
  expect(read).toEqual({
    refused: ["an advance hands in one step's output, and this hands in beats and prose"],
  })
})

test("a game master's beats with `--character` are refused as the writer's flag, not as prose", () => {
  const read = taken(
    ["--turn", SLUG, "--beats-file", "nowhere.txt", "--character", "character-player/mara"],
    CALLED,
    ROOT
  )
  expect(read).toEqual({
    refused: [
      "`--character` names who is present in the writer's prose, so it belongs to the writer's step with `--prose-file`, and this advance hands in beats",
    ],
  })
})

test("an advance naming no step's output hands in the world builder's lore", () => {
  expect(taken(["--turn", SLUG], CALLED, ROOT)).toEqual({
    turn: SLUG,
    chapter: false,
    handed: { kind: "lore", lore: [] },
  })
})

test("an advance names a written chapter at `--chapter`, and names a turn or a chapter but not both", () => {
  const chapter = "story-chapter-written/harem-hotel-0001"
  expect(taken(["--chapter", chapter], CALLED, ROOT)).toEqual({
    turn: chapter,
    chapter: true,
    handed: { kind: "lore", lore: [] },
  })
  const both = taken(["--turn", SLUG, "--chapter", chapter], CALLED, ROOT)
  expect(both).toEqual({
    refused: ["an advance names one turn at `--turn` or one chapter at `--chapter`"],
  })
  expect(taken([], CALLED, ROOT)).toEqual({
    refused: ["an advance names one turn at `--turn` or one chapter at `--chapter`"],
  })
})
