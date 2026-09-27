import { expect, test } from "bun:test"
import {
  type GuildListing,
  guildMaxPrice,
  pickGuildListings,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-guild-buy-core/inventory-rules-guild-buy-core.module.code.ts"

function listing(
  uniqueId: string,
  quantity: number,
  unitPrice: number,
  maxPrice = 50
): GuildListing<string> {
  return {
    uniqueId,
    itemId: 27036,
    link: `link ${uniqueId}`,
    quantity,
    price: quantity * unitPrice,
    unitPrice,
    maxPrice,
  }
}

function bought(picked: { readonly picks: readonly GuildListing<string>[] }): string[] {
  return picked.picks.map((one) => one.uniqueId)
}

test("the rule's max price wins over TTC's, and TTC's is used where the rule states none", () => {
  expect(guildMaxPrice(40, 55)).toBe(40)
  expect(guildMaxPrice(undefined, 55)).toBe(55)
  expect(guildMaxPrice(0, 55)).toBe(55)
  expect(guildMaxPrice(undefined, undefined)).toBe(undefined)
  expect(guildMaxPrice(undefined, 0)).toBe(undefined)
})

test("the cheapest listings for one are bought first, until the shortfall is covered", () => {
  const listings = [listing("dear", 10, 45), listing("cheap", 10, 20), listing("middle", 10, 30)]
  expect(bought(pickGuildListings(listings, 20, 1_000_000))).toEqual(["cheap", "middle"])
})

test("a stack larger than what is still short is passed over for a smaller one", () => {
  const listings = [listing("big", 100, 10), listing("small", 15, 30), listing("fits", 5, 40)]
  expect(bought(pickGuildListings(listings, 20, 1_000_000))).toEqual(["small", "fits"])
})

test("a listing above its max price for one is never bought", () => {
  const picked = pickGuildListings([listing("dear", 5, 60)], 20, 1_000_000)
  expect(bought(picked)).toEqual([])
  expect(picked.miss).toBe("over-price")
})

test("a listing costing more than the gold left is passed over", () => {
  const listings = [listing("first", 10, 20), listing("second", 10, 25)]
  expect(bought(pickGuildListings(listings, 20, 300))).toEqual(["first"])
})

test("buying nothing says the first check every listing failed", () => {
  expect(pickGuildListings([], 20, 1000).miss).toBe("none-listed")
  expect(pickGuildListings([{ ...listing("a", 5, 10), maxPrice: undefined }], 20, 1000).miss).toBe(
    "no-price"
  )
  expect(pickGuildListings([listing("a", 50, 10)], 20, 1000).miss).toBe("over-shortfall")
  expect(pickGuildListings([listing("a", 5, 10)], 20, 10).miss).toBe("over-gold")
  expect(pickGuildListings([listing("a", 5, 10)], 20, 1000).miss).toBe(undefined)
})
