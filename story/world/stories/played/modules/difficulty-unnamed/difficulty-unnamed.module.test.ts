import { expect, test } from "bun:test"
import { difficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.ts"
import { normal } from "akasha/story/world/stories/played/difficulty-levels/pages/normal.difficulty-level.ts"
import { levelUnnamed } from "akasha/story/world/stories/played/modules/difficulty-unnamed/difficulty-unnamed.module.code.ts"

test("a story naming no level plays at Normal", () => {
  expect(levelUnnamed()).toBe(`${difficultyLevel.slug}/${normal.slug}`)
})
