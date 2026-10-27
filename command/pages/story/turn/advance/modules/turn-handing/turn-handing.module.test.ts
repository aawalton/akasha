import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  movedTo,
  numberedOf,
  taken,
  titledOf,
} from "akasha/command/pages/story/turn/advance/modules/turn-handing/turn-handing.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const CALLED = "akasha story turn advance"

const ROOT = "/var/tmp/turn-handing-test-nowhere"

const SLUG = "the-saga-00-003"

test("an advance handing in two steps' output is refused before anything is read", () => {
  const read = taken(
    ["--turn", SLUG, "--beats-file", "nowhere.txt", "--issues-file", "nowhere.txt"],
    CALLED,
    ROOT
  )
  expect(read).toEqual({
    refused: ["an advance hands in one step's output, and this hands in beats and review"],
  })
})

test("beats handed in with prose carry the prose and its characters as what was told", () => {
  const beats = join(scratch.rootFor("turn-handing-told-"), "beats.txt")
  writeFileSync(beats, "Wren smiles.\nRain falls.\n")
  const read = taken(
    ["--turn", SLUG, "--beats-file", beats, "--prose-file", proseAt(), "--character", "a/b"],
    CALLED,
    ROOT
  )
  expect(read).toMatchObject({
    turn: SLUG,
    handed: {
      kind: "beats",
      beats: ["Wren smiles.", "Rain falls."],
      told: { kind: "prose", prose: "Wren smiles.\n", characters: ["a/b"] },
    },
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

test("an advance naming its turn by the turn's page path takes the turn's slug", () => {
  const at = `stories/the-saga/turns/${SLUG}.story-turn-played.ts`
  expect(taken(["--turn", at], CALLED, ROOT)).toMatchObject({ turn: SLUG, chapter: false })
})

test("an advance names a written chapter at `--chapter`, and names a turn or a chapter but not both", () => {
  const chapter = "story-chapter-written/the-saga-0002"
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

const CHAPTER = "story-chapter-written/the-saga-0002"

function proseAt(): string {
  const at = join(scratch.rootFor("turn-handing-"), "prose.txt")
  writeFileSync(at, "Wren smiles.\n")
  return at
}

test("a chapter's writer names the chapter at `--title` as it hands in the prose", () => {
  const prose = proseAt()
  const read = taken(
    ["--chapter", CHAPTER, "--prose-file", prose, "--title", " The Key "],
    CALLED,
    ROOT
  )
  expect(read).toEqual({
    turn: CHAPTER,
    chapter: true,
    handed: { kind: "prose", prose: "Wren smiles.\n", characters: [] },
    title: "The Key",
  })
  expect(taken(["--chapter", CHAPTER, "--prose-file", prose], CALLED, ROOT)).toEqual({
    refused: [
      "a writer names the chapter at `--title` as it hands in the chapter's prose, and this names no title",
    ],
  })
})

test("`--title` is refused on a turn and on a chapter step other than the writer's", () => {
  const refusal = {
    refused: [
      "`--title` names a written chapter, and only as its writer hands in the chapter's prose",
    ],
  }
  expect(taken(["--turn", SLUG, "--prose-file", proseAt(), "--title", "A"], CALLED, ROOT)).toEqual(
    refusal
  )
  expect(taken(["--chapter", CHAPTER, "--title", "A"], CALLED, ROOT)).toEqual(refusal)
})

function beatsProseAt(): string {
  const at = join(scratch.rootFor("turn-handing-beats-"), "prose.jsonl")
  const told = [
    { beat: 1, prose: "Wren smiles." },
    { beat: 2, prose: "The door opens." },
  ]
  writeFileSync(at, `${told.map((one) => JSON.stringify(one)).join("\n")}\n`)
  return at
}

test("a prose file naming a beat to a line is each beat's prose, collected into the prose", () => {
  expect(
    taken(["--chapter", CHAPTER, "--prose-file", beatsProseAt(), "--title", "A"], CALLED, ROOT)
  ).toEqual({
    turn: CHAPTER,
    chapter: true,
    handed: {
      kind: "prose",
      prose: "Wren smiles.\n\nThe door opens.\n",
      characters: [],
      beatProse: [
        { beat: 1, prose: "Wren smiles." },
        { beat: 2, prose: "The door opens." },
      ],
    },
    title: "A",
  })
})

function linesAt(told: readonly object[]): string {
  const at = join(scratch.rootFor("turn-handing-lines-"), "prose.jsonl")
  writeFileSync(at, `${told.map((one) => JSON.stringify(one)).join("\n")}\n`)
  return at
}

test("a beat's prose may hold paragraphs, and a beat that continues joins with a space", () => {
  const told = [
    { beat: 1, prose: "Wren smiles.\n\nShe waves." },
    { beat: 2, prose: "The door opens.", continues: true },
    { beat: 3, prose: "Rain falls." },
  ]
  const read = taken(
    ["--chapter", CHAPTER, "--prose-file", linesAt(told), "--title", "A"],
    CALLED,
    ROOT
  )
  expect(read).toEqual({
    turn: CHAPTER,
    chapter: true,
    handed: {
      kind: "prose",
      prose: "Wren smiles.\n\nShe waves. The door opens.\n\nRain falls.\n",
      characters: [],
      beatProse: told,
    },
    title: "A",
  })
})

test("a prose file of beat lines shaped wrong is refused, never taken as the prose itself", () => {
  const told = [{ beat: 1, prose: "Wren smiles.", continues: true }]
  expect(
    taken(["--chapter", CHAPTER, "--prose-file", linesAt(told), "--title", "A"], CALLED, ROOT)
  ).toEqual({
    refused: ["prose 1 states `continues` on beat 1, which has no paragraph before it to continue"],
  })
})

test("`--beat` rides on a writer's or a recorder's hand-in, and on no other", () => {
  const told = taken(["--turn", SLUG, "--prose-file", proseAt(), "--beat", "2"], CALLED, ROOT)
  expect(told).toMatchObject({ handed: { kind: "prose", prose: "Wren smiles.\n", beat: 2 } })
  const numbered = taken(["--turn", SLUG, "--recorder", "mechanics", "--beat", "1"], CALLED, ROOT)
  expect(numbered).toMatchObject({ handed: { kind: "record", recorder: "mechanics", beat: 1 } })
  expect(taken(["--turn", SLUG, "--beat", "1"], CALLED, ROOT)).toEqual({
    refused: ["`--beat` names the beat whose part a step hands in, and this hands in lore"],
  })
})

test("a titled chapter's slug keeps the story and number and spells the title after them", () => {
  expect(numberedOf("harem-hotel-0001-the-key", "harem-hotel")).toBe("harem-hotel-0001")
  expect(titledOf("harem-hotel-0001", "harem-hotel", "Experiment 2 — Natalie's Table")).toBe(
    "harem-hotel-0001-experiment-2-natalies-table"
  )
  expect(titledOf("harem-hotel-0001-old", "harem-hotel", "New")).toBe("harem-hotel-0001-new")
  expect(
    movedTo(
      "s/chapters/harem-hotel-0001.story-chapter-written.ts",
      "harem-hotel-0001",
      "harem-hotel-0001-new"
    )
  ).toBe("s/chapters/harem-hotel-0001-new.story-chapter-written.ts")
})
