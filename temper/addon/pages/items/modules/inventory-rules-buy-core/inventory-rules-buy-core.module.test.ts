import { expect, test } from "bun:test"
import {
  bestOffer,
  computeBuyQuantity,
  itemTypesOf,
  type StoreOffer,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-buy-core/inventory-rules-buy-core.module.code.ts"

const ELIXIR = 64710
const POTENT = 27036
const NORMAL = 54340

function offer(entryIndex: number, itemId: number, itemType = 7): StoreOffer {
  return { entryIndex, itemId, itemType, link: `link ${itemId}`, price: 10, maxBuyable: 100 }
}

test("the entry earliest in the rule's item ids wins, whatever order the store lists them", () => {
  const offers = [offer(1, NORMAL), offer(2, POTENT)]
  expect(bestOffer(offers, [ELIXIR, POTENT, NORMAL])?.itemId).toBe(POTENT)
})

test("an entry the item ids leave out ranks after every listed one", () => {
  const offers = [offer(1, 99999), offer(2, NORMAL)]
  expect(bestOffer(offers, [ELIXIR, POTENT, NORMAL])?.itemId).toBe(NORMAL)
})

test("with no item ids, the entry the store lists first wins", () => {
  expect(bestOffer([offer(3, 30357), offer(4, 30358)], undefined)?.entryIndex).toBe(3)
})

test("no entry taken is no offer", () => {
  expect(bestOffer([], [ELIXIR])).toBe(undefined)
})

test("the item types offered are named once each", () => {
  expect(itemTypesOf([offer(1, 1, 7), offer(2, 2, 7), offer(3, 3, 17)])).toEqual([7, 17])
})

test("what is bought never passes the shortfall, the store's limit or the gold carried", () => {
  expect(computeBuyQuantity(3800, 9999, 1_000_000, 5)).toBe(3800)
  expect(computeBuyQuantity(3800, 200, 1_000_000, 5)).toBe(200)
  expect(computeBuyQuantity(3800, 9999, 1000, 5)).toBe(200)
  expect(computeBuyQuantity(0, 9999, 1000, 5)).toBe(0)
})
