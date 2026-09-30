import { expect, test } from "bun:test"
import type { Admitted } from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import { loreRefused } from "akasha/story/world/stories/played/turns/modules/turn-lore-handed/turn-lore-handed.module.code.ts"

const FILED: Admitted = {
  types: [],
  filed: (address) => address !== "lore/saga-nowhere",
}

test("a filed lore page or place is handed in", () => {
  expect(loreRefused(["lore/saga-hall", "place/saga-gate"], FILED)).toBeNull()
  expect(loreRefused([], FILED)).toBeNull()
})

test("a page of no lore type is refused by its address", () => {
  expect(loreRefused(["character-other/saga-ceri"], FILED)).toContain(
    "`character-other/saga-ceri` is not"
  )
})

test("a lore address filing no page is refused by its address", () => {
  expect(loreRefused(["lore/saga-hall", "lore/saga-nowhere"], FILED)).toContain(
    "`lore/saga-nowhere` names no page"
  )
})
