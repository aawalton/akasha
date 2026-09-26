import { expect, test } from "bun:test"
import { panelsIn } from "akasha/story/ui/played-panel/change-generators/drawing/played-panel-drawing.change-generator.code.ts"

const FILED = "story/ui/played-panel/pages/tower-hud/tower-hud.played-panel.ts"

const ADDED = "story/ui/played-panel/pages/new-hud/new-hud.played-panel.ts"

const ADDED_CODE = "story/ui/played-panel/pages/new-hud/new-hud.played-panel.code.tsx"

test("a panel page the change adds is drawn though no index files that page yet", () => {
  expect(panelsIn([FILED], [ADDED, ADDED_CODE])).toEqual([FILED, ADDED])
})

test("a panel the index files already is named once", () => {
  expect(panelsIn([FILED], [FILED])).toEqual([FILED])
})

test("a file of no panel names no panel", () => {
  expect(panelsIn([], ["story/ui/ui.domain.ts"])).toEqual([])
})
