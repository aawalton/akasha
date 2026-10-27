import { expect, test } from "bun:test"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { metricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.ts"
import { testStoryPlayer } from "akasha/story/world/pages/test-world/stories/played/test-story/characters/test-story-player.character-player.ts"
import {
  added,
  next,
  settled,
} from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/checks/test-story-upkeep.world-check.settling.code.ts"
import { testStoryPlayer as purse } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/metrics/purses/test-story-player.metric-character-currency.ts"

const CHARACTER = `${characterPlayer.slug}/${testStoryPlayer.slug}`

test("a day's board takes three coin from the purse", () => {
  const reading = { character: CHARACTER, coin: 47 }
  const said = settled(reading)
  expect(said).toEqual({ answered: { paid: 3, coinLeft: 44 } })
  if (!("answered" in said)) return
  const page = `${metricCharacterCurrency.slug}/${purse.slug}`
  expect(added(reading, said.answered)).toEqual([{ page, key: "value", by: -3 }])
  expect(next(reading, said.answered)).toEqual({
    reading: { character: CHARACTER, coin: 44 },
    crossed: [],
    left: null,
  })
})

test("a day leaving less than the next day's board leaves the routine", () => {
  const reading = { character: CHARACTER, coin: 5 }
  const said = settled(reading)
  if (!("answered" in said)) throw new Error("refused")
  expect(next(reading, said.answered).left).toBe("no coin left for the next day's board")
})

test("a day that cannot be paid for is refused", () => {
  expect(settled({ character: CHARACTER, coin: 2 })).toHaveProperty("refused")
})
