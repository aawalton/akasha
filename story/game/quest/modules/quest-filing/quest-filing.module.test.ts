import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import type { Where } from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import { haremHotel } from "akasha/story/game/pages/harem-hotel/harem-hotel.game.ts"
import {
  conditionsOf,
  everyQuestFiled,
  statusOf,
} from "akasha/story/game/quest/modules/quest-filing/quest-filing.module.code.ts"

const WHERE: Where = {
  root: process.cwd(),
  game: namedAs(game.slug, haremHotel.slug, null),
  slug: haremHotel.slug,
  path: `story/game/pages/${haremHotel.slug}/${haremHotel.slug}.${game.slug}.ts`,
  folder: `story/game/pages/${haremHotel.slug}`,
}

const ROW = {
  turn: 20,
  quests: [
    { id: "kiss", title: "The Kiss", reward: "WILL +1", status: "complete", objective: "kiss her" },
    {
      id: "far",
      title: "The Far Way",
      status: "offered",
      objective: "reach it",
      conditions: ["alone"],
    },
  ],
}

test("a quest the old engine wrote as offered is active", () => {
  expect(statusOf("offered")).toBe("active")
  expect(statusOf("Complete")).toBe("complete")
  expect(statusOf(undefined)).toBe("active")
})

test("the conditions a quest carried are folded into one note", () => {
  expect(conditionsOf(["alone", "at night"])).toBe("alone; at night")
  expect(conditionsOf(undefined)).toBe(undefined)
})

test("every quest the last state row names becomes a page under its game", () => {
  const placed = everyQuestFiled(WHERE, [{ turn: 1, quests: [] }, ROW])
  if ("refused" in placed) throw new Error(placed.refused)
  expect(placed.answered.map((one) => one.at)).toEqual([
    "story/game/pages/harem-hotel/quests/harem-hotel-kiss.game-quest.ts",
    "story/game/pages/harem-hotel/quests/harem-hotel-far.game-quest.ts",
  ])
  expect(placed.answered[0]?.body).toContain('status: "complete"')
  expect(placed.answered[0]?.body).toContain('reward: "WILL +1"')
  expect(placed.answered[1]?.body).toContain('status: "active"')
  expect(placed.answered[1]?.body).toContain('note: "alone"')
  expect(placed.answered[1]?.body).not.toContain("reward")
})

test("a state with no row leaves no quest", () => {
  const placed = everyQuestFiled(WHERE, [])
  if ("refused" in placed) throw new Error(placed.refused)
  expect(placed.answered).toEqual([])
})
