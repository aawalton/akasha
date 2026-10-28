import { describe, expect, test } from "bun:test"
import { layoutCells } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-layout/hud-addon-layout.module.code.ts"

const SPACING = { edgePad: 16, minWidth: 56, gap: 24 }

describe("hud-addon-layout", () => {
  test("a narrow cell is a column wide and the next cell starts a gap after it", () => {
    expect(layoutCells([30, 40], SPACING)).toEqual([
      { shown: true, left: 16, width: 56 },
      { shown: true, left: 96, width: 56 },
    ])
  })

  test("a cell wider than a column pushes every cell after it along", () => {
    expect(layoutCells([150, 30], SPACING)).toEqual([
      { shown: true, left: 16, width: 150 },
      { shown: true, left: 190, width: 56 },
    ])
  })

  test("a cell with no text takes no room and every cell after it is still laid out", () => {
    expect(layoutCells([30, 0, 30, 30], SPACING)).toEqual([
      { shown: true, left: 16, width: 56 },
      { shown: false, left: 96, width: 0 },
      { shown: true, left: 96, width: 56 },
      { shown: true, left: 176, width: 56 },
    ])
  })

  test("a fractional text width is rounded up so every cell holds its whole text", () => {
    expect(layoutCells([100.2], SPACING)).toEqual([{ shown: true, left: 16, width: 101 }])
  })
})
