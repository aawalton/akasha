import { expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  declaringOf,
  typesCarrying,
  underneath,
} from "akasha/page/index/modules/property-declaring/property-declaring.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const scratch = scratchWorld()

const ID = "01a0bac0-0000-7000-8000-000000000000"

test("a reading with no page declares a property nowhere", () => {
  const root = scratch.rootFor("akasha-declaring-")

  expect(declaringOf(readingIn(root), ID)).toEqual([])
})

test("a reading with no page type holds nothing beneath an id", () => {
  const root = scratch.rootFor("akasha-declaring-")

  expect(underneath(readingIn(root), ID)).toEqual([])
})

test("a name no page property has is carried by no page type", () => {
  const root = scratch.rootFor("akasha-declaring-")

  expect([...typesCarrying(readingIn(root), "file-property/nowhere")]).toEqual([])
})
