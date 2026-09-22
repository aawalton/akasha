import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { gameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.ts"
import {
  lineOf,
  type MechanicRun,
} from "akasha/story/game/mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import { attributeCheck } from "akasha/story/game/mechanic/pages/attribute-check/attribute-check.game-mechanic.ts"
import { gameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.ts"
import {
  countedAt,
  pagedRun,
  runSlugIn,
  shortOf,
} from "akasha/story/game/mechanic-run/modules/run-paging/run-paging.module.code.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const FOLDER = "story/game/pages/the-tower/mechanic-runs"

const CHECK = namedAs(gameMechanic.slug, attributeCheck.slug, null)

const SHOWN = 80

const RUN: MechanicRun = {
  turn: 92,
  mechanic: CHECK,
  reading: { attribute: 11 },
  answered: { margin: 4 },
  bonuses: [],
  dice: { said: "1d20", sides: 20, faces: [9] },
  seed: "a-seed",
  follows: "a-hash",
  said: "a modest success",
}

test("a run is counted from one, padded", () => {
  expect(countedAt(1)).toBe("001")
  expect(countedAt(92)).toBe("092")
})

test("a run is named for its game and how many runs that game has", () => {
  expect(runSlugIn(theTower.slug, "run", 92)).toBe(`${theTower.slug}-run-092`)
})

test("a long line is shortened for a page's name", () => {
  expect(shortOf("a short one", SHOWN)).toBe("a short one")
  expect(shortOf("a\nbroken   line", SHOWN)).toBe("a broken line")
  expect(shortOf("abcdefghij", 4)).toBe("abcd…")
})

test("a run's page carries what a reader looks that run up by", () => {
  const made = pagedRun({ gameSlug: theTower.slug, folder: FOLDER, run: RUN, at: 92 })
  expect(made.slug).toBe(`${theTower.slug}-run-092`)
  expect(made.path).toBe(`${FOLDER}/${theTower.slug}-run-092.${gameMechanicRun.slug}.ts`)
  expect(made.values["game"]).toBe(namedAs(game.slug, theTower.slug, null))
  expect(made.values["turn"]).toBe(92)
  expect(made.values["mechanic"]).toBe(CHECK)
  expect(made.values["seed"]).toBe("a-seed")
  expect(made.values["follows"]).toBe("a-hash")
  expect(made.values["title"]).toBe("a modest success")
})

test("the file beside a run's page carries that run whole", () => {
  const made = pagedRun({ gameSlug: theTower.slug, folder: FOLDER, run: RUN, at: 92 })
  expect(made.bodies?.["workings"]).toBe(lineOf(RUN))
})

test("a run that said nothing is named for its mechanic and its turn", () => {
  const made = pagedRun({
    gameSlug: theTower.slug,
    folder: FOLDER,
    run: { ...RUN, said: null },
    at: 1,
  })
  expect(made.values["title"]).toBe(`${CHECK} at turn 92`)
  expect(made.values["said"]).toBeUndefined()
})
