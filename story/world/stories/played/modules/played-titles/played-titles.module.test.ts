import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { worldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.ts"
import { testWorldTester } from "akasha/story/world/pages/test-world/mechanics/titles/test-world-tester.world-title.ts"
import { titlesHeldIn } from "akasha/story/world/stories/played/modules/played-titles/played-titles.module.code.ts"

const TESTER = namedAs(worldTitle.slug, testWorldTester.slug, null)

test("a title held is named by the world's title it names, once", () => {
  const rows = [{ values: { "world-title": TESTER } }, { values: { "world-title": TESTER } }]
  expect(titlesHeldIn(rows, new Map([[TESTER, "Tester"]]))).toEqual(["Tester"])
})

test("a world's title stating no title is named by its slug", () => {
  expect(titlesHeldIn([{ values: { "world-title": TESTER } }], new Map())).toEqual([
    testWorldTester.slug,
  ])
})
