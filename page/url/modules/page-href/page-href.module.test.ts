import { expect, test } from "bun:test"
import {
  canonicalAddress,
  samePageAt,
} from "akasha/page/url/modules/page-href/page-href.module.code.ts"

const CANONICAL = "/seat/new-name-e02d8ca0"

function at(pathname: string, search = "", hash = "") {
  return { pathname, search, hash }
}

test("an address naming an old slug is corrected to the page's own, keeping its query and hash", () => {
  expect(
    canonicalAddress(at("/seat/old-name-e02d8ca0", "?display=properties", "#end"), CANONICAL)
  ).toBe("/seat/new-name-e02d8ca0?display=properties#end")
})

test("an address already naming the page's own slug is left as it is", () => {
  expect(canonicalAddress(at(CANONICAL), CANONICAL)).toBeNull()
})

test("an address is left as it is where no canonical address is known", () => {
  expect(canonicalAddress(at("/seat/old-name-e02d8ca0"), null)).toBeNull()
})

test("an address reaching another page or another page type is never rewritten", () => {
  expect(canonicalAddress(at("/seat/old-name-0000beef"), CANONICAL)).toBeNull()
  expect(canonicalAddress(at("/persona/old-name-e02d8ca0"), CANONICAL)).toBeNull()
})

test("two addresses reach the same page where their page type and id suffix agree", () => {
  expect(samePageAt("/seat/old-name-e02d8ca0", CANONICAL)).toBe(true)
  expect(samePageAt("/seat/e02d8ca0", CANONICAL)).toBe(true)
  expect(samePageAt("/seat/old-name-e02d8ca1", CANONICAL)).toBe(false)
  expect(samePageAt("/seat", CANONICAL)).toBe(false)
  expect(samePageAt("/seat/old-name-e02d8ca0/more", CANONICAL)).toBe(false)
})
