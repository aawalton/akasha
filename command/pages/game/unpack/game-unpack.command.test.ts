import { expect, test } from "bun:test"
import {
  designRowed,
  loreRowed,
  messageFor,
  noteOf,
  numberIn,
  rowsIn,
  taken,
  titleOf,
} from "akasha/command/pages/game/unpack/game-unpack.command.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameDesignEntry } from "akasha/story/game/design-entry/game-design-entry.page-type.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const CALLED = "akasha game unpack"

const SAID = namedAs(game.slug, theTower.slug, null)

const ROW = {
  "external-id": "world-logic-death-loop",
  "design-kind": "world-logic",
  "subject-key": "death-loop",
  "source-ref": "Alan ruling, held dark until the first death",
  content: {
    kind: "world-logic",
    rule: "dying returns him to the entrance",
    implications: "he does not know",
  },
}

const FOLDER = "story/game/pages/the-tower/design-entries"

test("a key is titled with its words apart and each one capitalised", () => {
  expect(titleOf("death-loop")).toBe("Death Loop")
  expect(titleOf("designSeeds")).toBe("Design Seeds")
  expect(titleOf("subject-key")).toBe("Subject Key")
})

test("what a row carried becomes a heading for each part of it", () => {
  const note = noteOf(ROW.content)
  expect(note).toContain("## Rule")
  expect(note).toContain("## Implications")
  expect(note).toContain("dying returns him to the entrance")
})

test("the kind a row states twice is written once", () => {
  expect(noteOf(ROW.content)).not.toContain("## Kind")
})

test("a listed thing with a name becomes a heading of its own", () => {
  const note = noteOf({ items: [{ name: "The Letter-Knife", effect: "made for placement" }] })
  expect(note).toContain("### The Letter-Knife")
  expect(note).toContain("**Effect** — made for placement")
})

test("a row becomes a page named for the game and the row", () => {
  const made = designRowed(theTower.slug, FOLDER, ROW)
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.slug).toBe(`${theTower.slug}-world-logic-death-loop`)
  expect(made.path).toBe(
    `${FOLDER}/${theTower.slug}-world-logic-death-loop.${gameDesignEntry.slug}.ts`
  )
  expect(made.values["title"]).toBe("Death Loop")
  expect(made.values["game"]).toBe(SAID)
  expect(made.values["kind"]).toBe("world-logic")
  expect(made.values["note"]).toBe("md")
})

test("a row superseding another names that other as a page", () => {
  const made = designRowed(theTower.slug, FOLDER, { ...ROW, supersedes: "an-earlier-one" })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["supersedes"]).toBe(
    namedAs(gameDesignEntry.slug, `${theTower.slug}-an-earlier-one`, null)
  )
})

test("a row naming no external id is refused", () => {
  const made = designRowed(theTower.slug, FOLDER, { "design-kind": "world-logic" })
  expect("refused" in made).toBe(true)
})

test("a blank line between rows is no row", () => {
  expect(rowsIn('{"a":1}\n\n{"a":2}\n')).toEqual(['{"a":1}', '{"a":2}'])
})

test("the commit says which rows of which game were made into pages", () => {
  expect(messageFor(gameDesignEntry.pluralSlug, theTower.slug)).toBe(
    `make a page of each ${gameDesignEntry.pluralSlug} row of ${theTower.slug}`
  )
})

test("a call names the game and the rows beside it", () => {
  const read = taken(["--game", SAID, "--ledger", gameDesignEntry.pluralSlug], CALLED)
  expect(read).toEqual({ game: SAID, ledger: gameDesignEntry.pluralSlug })
})

test("rows this command does not know are refused", () => {
  const read = taken(["--game", SAID, "--ledger", "rolls"], CALLED)
  expect("refused" in read).toBe(true)
})

test("the turn a lore row cites is read as its number", () => {
  expect(numberIn("turn-13")).toBe(13)
  expect(numberIn(7)).toBe(7)
  expect(numberIn("nowhere")).toBe(null)
})

test("an entity lore row becomes a page saying what it settles about its subject", () => {
  const made = loreRowed(theTower.slug, FOLDER, {
    externalId: "ent-aria-age",
    loreKind: "entity",
    subjectKey: "aria",
    sourceTurn: "turn-12",
    citation: { quote: "three thousand years", turnExternalId: "turn-12" },
    content: { kind: "entity", value: "roughly three thousand years old", attribute: "age" },
  })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["title"]).toBe("Aria")
  expect(made.values["subject"]).toBe("aria")
  expect(made.values["said"]).toBe("roughly three thousand years old")
  expect(made.values["turn"]).toBe(12)
  expect(made.values["attribute"]).toBe("age")
  expect(made.values["quote"]).toBe("three thousand years")
})

test("a thread lore row carries whether the play has answered it", () => {
  const made = loreRowed(theTower.slug, FOLDER, {
    externalId: "thr-far-door",
    loreKind: "thread",
    subjectKey: "harem-hotel",
    sourceTurn: "turn-3",
    content: { kind: "thread", status: "open", summary: "the far door is still unentered" },
  })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["status"]).toBe("open")
  expect(made.values["said"]).toBe("the far door is still unentered")
  expect(made.values["attribute"]).toBeUndefined()
})

test("a timeline lore row carries where its beat falls", () => {
  const made = loreRowed(theTower.slug, FOLDER, {
    externalId: "tl-2",
    loreKind: "timeline",
    subjectKey: "alan",
    sourceTurn: "turn-1",
    content: { kind: "timeline", event: "the wall grows a doorway", ordinal: 2 },
  })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["ordinal"]).toBe(2)
  expect(made.values["said"]).toBe("the wall grows a doorway")
})

test("a quote lore row carries who said the line", () => {
  const made = loreRowed(theTower.slug, FOLDER, {
    externalId: "q-aria-1",
    loreKind: "quote",
    subjectKey: "aria",
    sourceTurn: "turn-9",
    content: { kind: "quote", line: "It doesn't get to call this one.", speaker: "aria" },
  })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["speaker"]).toBe("aria")
  expect(made.values["said"]).toBe("It doesn't get to call this one.")
})

test("a lore row citing no turn is refused", () => {
  const made = loreRowed(theTower.slug, FOLDER, {
    externalId: "ent-aria-age",
    loreKind: "entity",
    subjectKey: "aria",
    content: { kind: "entity", value: "old", attribute: "age" },
  })
  expect("refused" in made).toBe(true)
})
