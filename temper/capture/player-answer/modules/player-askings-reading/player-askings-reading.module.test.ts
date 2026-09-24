import { expect, test } from "bun:test"
import {
  askingsCode,
  playerAskingsIn,
} from "akasha/temper/capture/player-answer/modules/player-askings-reading/player-askings-reading.module.code.ts"

const DOC = `h1. ESO UI Documentation for API Version 101050

h2. Game API

h3. Items
* GetItemName(*[Bag|#Bag]* _bagId_, *integer* _slotIndex_)
** _Returns:_ *string* _name_

* GetItemLink(*[Bag|#Bag]* _bagId_, *integer* _slotIndex_, *[LinkStyle|#LinkStyle]* _linkStyle_)
** _Returns:_ *string* _link_

* GetBagSize(*[Bag|#Bag]* _bagId_)
** _Returns:_ *integer* _size_

* UseItem *protected* (*[Bag|#Bag]* _bagId_, *integer* _slotIndex_)

* ClearItem(*[Bag|#Bag]* _bagId_, *integer* _slotIndex_)

* IsPlayerActivated()
** _Returns:_ *bool* _activated_

* GetSomethingOdd(*integer* _oddValue_)
** _Returns:_ *integer* _odd_
`

test("a function that only asks is kept under the names of its values", () => {
  const held = playerAskingsIn(DOC)
  expect(held["bagId,slotIndex"]).toEqual(["GetItemLink", "GetItemName"])
  expect(held.bagId).toEqual(["GetBagSize"])
  expect(held[""]).toEqual(["IsPlayerActivated"])
})

test("a function taking values past a shape is asked with that shape's values alone", () => {
  expect(playerAskingsIn(DOC)["bagId,slotIndex"]).toContain("GetItemLink")
})

test("a function the capture knows no values for is left out", () => {
  const held = playerAskingsIn(DOC)
  expect(Object.values(held).flat()).not.toContain("GetSomethingOdd")
  expect(Object.values(held).flat()).not.toContain("ClearItem")
  expect(Object.values(held).flat()).not.toContain("UseItem")
})

test("the table is written as code the add-on imports", () => {
  expect(askingsCode({ "": ["IsPlayerActivated"], bagId: ["GetBagSize"] })).toBe(
    [
      "export const PLAYER_ASKINGS: Readonly<Record<string, readonly string[]>> = {",
      '  "": ["IsPlayerActivated"],',
      '  "bagId": ["GetBagSize"],',
      "}",
      "",
    ].join("\n")
  )
})
