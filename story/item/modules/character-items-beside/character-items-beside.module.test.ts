import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  type Filed,
  hadIn,
  slotNamesIn,
} from "akasha/story/item/modules/character-items-beside/character-items-beside.module.code.ts"
import { itemSlot } from "akasha/story/item/slot/item-slot.page-type.ts"
import { chest } from "akasha/story/item/slot/pages/chest.item-slot.ts"
import { mainHand } from "akasha/story/item/slot/pages/main-hand.item-slot.ts"
import { offHand } from "akasha/story/item/slot/pages/off-hand.item-slot.ts"

const SLOTS = {
  [chest.slug]: chest.title,
  [mainHand.slug]: mainHand.title,
}

const HELD = namedAs(itemSlot.slug, mainHand.slug, null)

const WORN = namedAs(itemSlot.slug, chest.slug, null)

const UNTITLED = namedAs(itemSlot.slug, offHand.slug, null)

const MAUL = "Burning Anger"

const CLOAK = "Stalker hide cloak"

const HIDE = "Stalker hide"

const NOTE = "A light, tough, pale hide."

function rowOf(values: Record<string, unknown>): Filed {
  return { values }
}

test("a slot's title is filed under the slug of the page carrying that title", () => {
  const rows = [rowOf({ slug: chest.slug, title: chest.title })]
  expect(slotNamesIn(rows)).toEqual({ [chest.slug]: chest.title })
})

test("a slot page stating no title is left out of the slot names", () => {
  const rows = [rowOf({ slug: mainHand.slug }), rowOf({ slug: chest.slug, title: chest.title })]
  expect(slotNamesIn(rows)).toEqual({ [chest.slug]: chest.title })
})

test("an item naming a slot is worn under that slot's title", () => {
  const had = hadIn([rowOf({ title: MAUL, slot: HELD })], SLOTS)
  expect(had.worn).toEqual({ [mainHand.title]: { name: MAUL } })
  expect(had.carried).toEqual([])
})

test("an item naming no slot is carried rather than worn", () => {
  const had = hadIn([rowOf({ title: HIDE })], SLOTS)
  expect(had.worn).toEqual({})
  expect(had.carried).toEqual([{ name: HIDE }])
})

test("the note a carried item shows is that item's description", () => {
  const had = hadIn([rowOf({ title: HIDE, description: NOTE })], SLOTS)
  expect(had.carried).toEqual([{ name: HIDE, note: NOTE }])
})

test("a carried item whose page states no description carries no note", () => {
  const [one] = hadIn([rowOf({ title: HIDE })], SLOTS).carried
  expect(Object.keys(one ?? {})).toEqual(["name"])
})

test("an item naming a slot no page titles is carried rather than worn", () => {
  const had = hadIn([rowOf({ title: MAUL, slot: UNTITLED })], SLOTS)
  expect(had.worn).toEqual({})
  expect(had.carried).toEqual([{ name: MAUL }])
})

test("an item stating no title is left out", () => {
  expect(hadIn([rowOf({ slot: HELD })], SLOTS)).toEqual({ worn: {}, carried: [] })
})

test("a slot another item already fills leaves the later item among the carried", () => {
  const rows = [rowOf({ title: MAUL, slot: HELD }), rowOf({ title: HIDE, slot: HELD })]
  const had = hadIn(rows, SLOTS)
  expect(had.worn).toEqual({ [mainHand.title]: { name: MAUL } })
  expect(had.carried).toEqual([{ name: HIDE }])
})

test("the worn slots come back in the order their titles sort", () => {
  const rows = [rowOf({ title: MAUL, slot: HELD }), rowOf({ title: CLOAK, slot: WORN })]
  expect(Object.keys(hadIn(rows, SLOTS).worn)).toEqual([chest.title, mainHand.title])
})

test("the carried items come back in the order their names sort", () => {
  const rows = [rowOf({ title: HIDE }), rowOf({ title: CLOAK }), rowOf({ title: MAUL })]
  expect(hadIn(rows, SLOTS).carried.map((one) => one.name)).toEqual([MAUL, HIDE, CLOAK])
})

test("no row at all answers nothing worn and nothing carried", () => {
  expect(hadIn([], SLOTS)).toEqual({ worn: {}, carried: [] })
})
