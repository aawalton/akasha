import { expect, test } from "bun:test"
import {
  designRowed,
  messageFor,
  noteOf,
  rowsIn,
  taken,
  titleOf,
} from "akasha/command/pages/game/unpack/game-unpack.command.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameDesignEntry } from "akasha/story/game/design-entry/game-design-entry.page-type.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"
import { designEntries } from "akasha/story/game/properties/design-entries.file-property.ts"

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
  expect(messageFor(designEntries.propertySlug, theTower.slug)).toBe(
    `make a page of each ${designEntries.propertySlug} row of ${theTower.slug}`
  )
})

test("a call names the game and the rows beside it", () => {
  const read = taken(["--game", SAID, "--ledger", designEntries.propertySlug], CALLED)
  expect(read).toEqual({ game: SAID, ledger: designEntries.propertySlug })
})

test("rows this command does not know are refused", () => {
  const read = taken(["--game", SAID, "--ledger", "rolls"], CALLED)
  expect("refused" in read).toBe(true)
})
