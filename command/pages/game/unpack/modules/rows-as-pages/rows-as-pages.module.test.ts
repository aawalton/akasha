import { expect, test } from "bun:test"
import {
  designRowed,
  loreRowed,
  type Made,
  noteOf,
  numberIn,
  rollRowed,
  ruleslessIn,
  runRowed,
  sluggedOf,
  titleOf,
} from "akasha/command/pages/game/unpack/modules/rows-as-pages/rows-as-pages.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameDesignEntry } from "akasha/story/game/design-entry/game-design-entry.page-type.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { gameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.ts"
import { attackResolution } from "akasha/story/game/mechanic/pages/attack-resolution/attack-resolution.game-mechanic.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const SAID = namedAs(game.slug, theTower.slug, null)

const RAN = namedAs(gameMechanic.slug, attackResolution.slug, null)

const FOLDER = "story/game/pages/the-tower/design-entries"

const AT = 1

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

function designed(row: Record<string, unknown>): Made {
  return designRowed({ gameSlug: theTower.slug, folder: FOLDER, row, at: AT })
}

function lored(row: Record<string, unknown>): Made {
  return loreRowed({ gameSlug: theTower.slug, folder: FOLDER, row, at: AT })
}

test("a key is titled with its words apart and each one capitalised", () => {
  expect(titleOf("death-loop")).toBe("Death Loop")
  expect(titleOf("designSeeds")).toBe("Design Seeds")
  expect(titleOf("subject-key")).toBe("Subject Key")
})

test("a name a row was filed under is cleaned into a slug", () => {
  expect(sluggedOf("ent-aria-onLuck")).toBe("ent-aria-on-luck")
  expect(sluggedOf("ent-doorward-combat-v2")).toBe("ent-doorward-combat-v2")
  expect(sluggedOf("tl-15c")).toBe("tl-15c")
  expect(sluggedOf("Floor 1 / v2")).toBe("floor-1-v2")
})

test("the turn a row cites is read as its number", () => {
  expect(numberIn("turn-13")).toBe(13)
  expect(numberIn(7)).toBe(7)
  expect(numberIn("nowhere")).toBe(null)
})

test("what a design row carried becomes a heading for each part of it", () => {
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

test("a design row becomes a page named for the game and the row", () => {
  const made = designed(ROW)
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

test("a design row superseding another names that other as a page", () => {
  const made = designed({ ...ROW, supersedes: "an-earlier-one" })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["supersedes"]).toBe(
    namedAs(gameDesignEntry.slug, `${theTower.slug}-an-earlier-one`, null)
  )
})

test("a design row naming no external id is refused", () => {
  expect("refused" in designed({ "design-kind": "world-logic" })).toBe(true)
})

test("an entity lore row becomes a page saying what it settles about its subject", () => {
  const made = lored({
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
  const made = lored({
    externalId: "thr-far-gate",
    loreKind: "thread",
    subjectKey: "harem-hotel",
    sourceTurn: "turn-3",
    content: { kind: "thread", status: "open", summary: "the far way is still unentered" },
  })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["status"]).toBe("open")
  expect(made.values["said"]).toBe("the far way is still unentered")
  expect(made.values["attribute"]).toBeUndefined()
})

test("a timeline lore row carries where its beat falls", () => {
  const made = lored({
    externalId: "tl-2",
    loreKind: "timeline",
    subjectKey: "alan",
    sourceTurn: "turn-1",
    content: { kind: "timeline", event: "the wall grows a way through", ordinal: 2 },
  })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["ordinal"]).toBe(2)
  expect(made.values["said"]).toBe("the wall grows a way through")
})

test("a quote lore row carries who said the line", () => {
  const made = lored({
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
  const made = lored({
    externalId: "ent-aria-age",
    loreKind: "entity",
    subjectKey: "aria",
    content: { kind: "entity", value: "old", attribute: "age" },
  })
  expect("refused" in made).toBe(true)
})

test("a mechanic run row becomes a page naming the mechanic that ran", () => {
  const row = {
    turn: 84,
    mechanic: RAN,
    reading: { die: 20 },
    answered: { damage: 150 },
    bonuses: [],
    dice: null,
    seed: null,
    follows: "49c932ee",
    said: "CLEAN KILL",
  }
  const made = runRowed({ gameSlug: theTower.slug, folder: FOLDER, row, at: 7 })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.slug).toBe(`${theTower.slug}-run-007`)
  expect(made.values["turn"]).toBe(84)
  expect(made.values["mechanic"]).toBe(RAN)
  expect(made.values["follows"]).toBe("49c932ee")
  expect(made.values["title"]).toBe("CLEAN KILL")
  expect(made.bodies?.["workings"]).toBe(JSON.stringify(row))
})

test("a run naming no mechanic is refused", () => {
  const made = runRowed({ gameSlug: theTower.slug, folder: FOLDER, row: { turn: 1 }, at: 1 })
  expect("refused" in made).toBe(true)
})

test("a roll naming no turn is named for its place in the file", () => {
  const made = rollRowed({
    gameSlug: theTower.slug,
    folder: FOLDER,
    row: { kind: "resolve" },
    at: 11,
  })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.values["turn"]).toBeUndefined()
  expect(made.values["title"]).toBe("roll 011")
})

test("the copy of the rules a roll row carried is left out of its workings", () => {
  const held = ruleslessIn({ turn: 4, resolve: { input: { mode: "phys" }, rulebook: { a: 1 } } })
  expect(held["resolve"]).toEqual({ input: { mode: "phys" } })
})

test("a roll row becomes a page under the runs, with the roll it comes after", () => {
  const row = {
    externalId: "49c932ee",
    kind: "resolve",
    label: "t84 committed maul strike",
    seed: "b8decc9e",
    result: 150,
    prevHash: "7cdc3cc1",
    turn: 84,
    resolve: { input: { mode: "phys" }, rulebook: { summary: "gone" } },
  }
  const made = rollRowed({ gameSlug: theTower.slug, folder: FOLDER, row, at: 3 })
  expect("refused" in made).toBe(false)
  if ("refused" in made) return
  expect(made.slug).toBe(`${theTower.slug}-roll-003`)
  expect(made.values["turn"]).toBe(84)
  expect(made.values["follows"]).toBe("7cdc3cc1")
  expect(made.values["said"]).toBe("t84 committed maul strike")
  expect(made.bodies?.["workings"]).not.toContain("rulebook")
})
