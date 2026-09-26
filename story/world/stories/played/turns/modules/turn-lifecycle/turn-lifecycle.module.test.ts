import { expect, test } from "bun:test"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import {
  type Advanced,
  advanced,
  builderOf,
  type Caller,
  flexOf,
  type Held,
  type Latest,
  linesIn,
  type Moved,
  slugAfter,
  stepIn,
  type TurnStep,
  turnAfter,
  workingSaid,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

const GAME = "the-saga"

const VOICE = "voice"

const TWO = [continuity.slug, VOICE]

const BUILDER: Caller = { role: "world-builder", game: GAME }

const MASTER: Caller = { role: "game-master", game: GAME }

const REVIEWER: Caller = { role: "reviewer", game: GAME }

const WRITER: Caller = { role: "writer", game: GAME }

const WORDS = `${unit.slug}/${words.slug}`

function at(step: TurnStep): string {
  return `${turnStatus.slug}/${step}`
}

function by(reviewer: string): string {
  return `${storyReviewer.slug}/${reviewer}`
}

function heldAt(status: TurnStep, more: Partial<Held> = {}): Held {
  return { game: GAME, status, lore: [], issues: [], reviewedBy: [], ...more }
}

function movedOf(said: Advanced): Moved {
  if ("refused" in said) throw new Error(said.refused)
  return said
}

function refusalOf(said: Advanced): string {
  if (!("refused" in said)) throw new Error(`moved to ${said.status}`)
  return said.refused
}

test("the world builder hands in the lore it landed and the turn goes to the game master", () => {
  const said = movedOf(
    advanced(heldAt("world-builder"), BUILDER, { kind: "lore", lore: ["lore/a-hall"] }, TWO)
  )
  expect(said.status).toBe("game-master")
  expect(said.values).toEqual({ turnStatus: at("game-master"), lore: ["lore/a-hall"] })
  expect(said.starts).toEqual([])
  expect(said.stopsCaller).toBe(false)
})

test("the world builder may hand in no lore", () => {
  const said = movedOf(advanced(heldAt("world-builder"), BUILDER, { kind: "lore", lore: [] }, TWO))
  expect(said.values).toEqual({ turnStatus: at("game-master") })
})

test("the game master's beats send an unreviewed turn to every reviewer", () => {
  const beats = ["Mara opens the gate", "The hall is dark"]
  const said = movedOf(advanced(heldAt("game-master"), MASTER, { kind: "beats", beats }, TWO))
  expect(said.status).toBe("reviewers")
  expect(said.values).toEqual({ turnStatus: at("reviewers"), beats })
  expect(said.starts).toEqual([
    { kind: "reviewer", reviewer: continuity.slug },
    { kind: "reviewer", reviewer: VOICE },
  ])
})

test("the game master's repair after review goes straight to the writer", () => {
  const held = heldAt("game-master", { reviewedBy: TWO, issues: ["a fault"] })
  const said = movedOf(advanced(held, MASTER, { kind: "beats", beats: ["mended"] }, TWO))
  expect(said.status).toBe("writer")
  expect(said.starts).toEqual([{ kind: "writer" }])
})

test("with no story reviewer the game master's beats go to the writer", () => {
  const said = movedOf(advanced(heldAt("game-master"), MASTER, { kind: "beats", beats: ["a"] }, []))
  expect(said.status).toBe("writer")
})

test("a reviewer that is not the last adds itself and its issues and leaves the turn with the reviewers", () => {
  const found = { kind: "review", reviewer: VOICE, issues: ['"opens" - it was locked'] } as const
  const said = movedOf(advanced(heldAt("reviewers"), REVIEWER, found, TWO))
  expect(said.status).toBe("reviewers")
  expect(said.values).toEqual({
    turnStatus: at("reviewers"),
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
    turnStatus: at("game-master"),
    reviewedBy: [by(VOICE), by(continuity.slug)],
    issues: ["an earlier fault"],
  })
  expect(said.stopsCaller).toBe(true)
})

test("the last reviewer sends a turn with no issues on to the writer", () => {
  const held = heldAt("reviewers", { reviewedBy: [VOICE] })
  const found = { kind: "review", reviewer: continuity.slug, issues: [] } as const
  const said = movedOf(advanced(held, REVIEWER, found, TWO))
  expect(said.status).toBe("writer")
  expect(said.starts).toEqual([{ kind: "writer" }])
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

test("the writer's prose moves the turn to the player with its length and characters", () => {
  const handed = {
    kind: "prose",
    prose: "Mara opens the gate.",
    characters: ["character-player/mara", "character-other/ceri"],
  } as const
  const said = movedOf(advanced(heldAt("writer"), WRITER, handed, TWO))
  expect(said.status).toBe("player")
  expect(said.prose).toBe("Mara opens the gate.\n")
  expect(said.values).toEqual({
    turnStatus: at("player"),
    prose: "txt",
    ownLength: 4,
    characters: ["character-player/mara", "character-other/ceri"],
  })
  expect(said.starts).toEqual([])
  expect(said.stopsCaller).toBe(true)
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
  const long = { kind: "beats", beats: ["x".repeat(101)] } as const
  expect(refusalOf(advanced(heldAt("game-master"), MASTER, long, TWO))).toContain("101")
  const none = { kind: "beats", beats: [] } as const
  expect(refusalOf(advanced(heldAt("game-master"), MASTER, none, TWO))).toContain("none")
})

test("empty prose, and a character named by no address, are refused", () => {
  const empty = { kind: "prose", prose: " \n", characters: [] } as const
  expect(refusalOf(advanced(heldAt("writer"), WRITER, empty, TWO))).toContain("none")
  const bare = { kind: "prose", prose: "words", characters: ["mara"] } as const
  expect(refusalOf(advanced(heldAt("writer"), WRITER, bare, TWO))).toContain("mara")
})

const LATEST: Latest = {
  slug: "the-saga-00-002",
  position: 2,
  collections: ["story-played/the-saga"],
  unit: WORDS,
  status: "player",
}

test("an action makes the next turn at the world builder, copying the story's turns", () => {
  expect(turnAfter(LATEST, "I open the gate")).toEqual({
    slug: "the-saga-00-003",
    values: {
      partOfCollections: ["story-played/the-saga"],
      position: 3,
      unit: WORDS,
      turnStatus: at("world-builder"),
      action: "I open the gate",
    },
  })
})

test("an action is kept exactly as it was typed", () => {
  const made = turnAfter(LATEST, "  I *shout*, twice  ")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.values["action"]).toBe("  I *shout*, twice  ")
})

test("an action is refused while the last turn is still being made", () => {
  const made = turnAfter({ ...LATEST, status: "reviewers" }, "I wait")
  expect(made).toEqual({
    refused: "The last turn is still being made: the reviewers are working on it.",
  })
})

test("a slug's last number counts on, padded as it was", () => {
  expect(slugAfter("the-dating-game-00-002")).toBe("the-dating-game-00-003")
  expect(slugAfter("the-saga-00-009")).toBe("the-saga-00-010")
  expect(slugAfter("the-saga-00-999")).toBe("the-saga-00-1000")
  expect(slugAfter("the-saga")).toBeNull()
})

test("the words naming a step, and the seats a turn's notices reach", () => {
  expect(stepIn(at("game-master"))).toBe("game-master")
  expect(stepIn(`${turnStatus.slug}/nobody`)).toBeNull()
  expect(workingSaid("world-builder")).toBe("The world builder is working…")
  expect(workingSaid("reviewers")).toBe("The reviewers are working…")
  expect(builderOf("mari-game-master-the-saga", GAME)).toBe("mari-world-builder-the-saga")
  expect(builderOf("the-saga-game-master", GAME)).toBeNull()
  expect(flexOf([VOICE, continuity.slug], VOICE)).toBe("flex-2")
  expect(linesIn(" one \n\n two\r\n")).toEqual(["one", "two"])
})
