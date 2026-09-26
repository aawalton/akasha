import { expect, test } from "bun:test"
import {
  numberIn,
  rollRowed,
  ruleslessIn,
  runRowed,
} from "akasha/command/pages/game/unpack/modules/rows-as-pages/rows-as-pages.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.ts"
import { attackResolution } from "akasha/story/game/game-mechanic/pages/attack-resolution/attack-resolution.game-mechanic.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.story-game.ts"

const RAN = namedAs(gameMechanic.slug, attackResolution.slug, null)

const FOLDER = "story/game/pages/the-tower/mechanic-runs"

test("the turn a row cites is read as its number", () => {
  expect(numberIn("turn-13")).toBe(13)
  expect(numberIn(7)).toBe(7)
  expect(numberIn("nowhere")).toBe(null)
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
