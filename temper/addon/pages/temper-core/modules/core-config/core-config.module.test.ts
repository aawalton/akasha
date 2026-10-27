import { describe, expect, test } from "bun:test"
import {
  type HudLayout,
  hudLayoutIn,
} from "akasha/temper/addon/pages/temper-core/modules/core-config/core-config.module.code.ts"

const LAYOUT: HudLayout = {
  docks: { bottom: { gap: 10 } },
  panels: [{ key: "ZO_ActionBar1", dock: "bottom", displayOrder: 1, neverMoves: true }],
}

describe("core-config", () => {
  test("a config the watcher wrote answers its HUD layout", () => {
    expect(hudLayoutIn({ version: 1, hudLayout: LAYOUT })).toEqual(LAYOUT)
  })

  test("a panel measured by another control answers that control", () => {
    const measured: HudLayout = {
      docks: {},
      panels: [
        {
          key: "ZO_HUDTrackers",
          dock: "top-right",
          displayOrder: 1,
          neverMoves: false,
          measuredBy: "ZO_HUDTrackersScrollContainerScrollChild",
        },
      ],
    }
    const panel = hudLayoutIn({ version: 1, hudLayout: measured })?.panels[0]
    expect(panel?.measuredBy).toBe("ZO_HUDTrackersScrollContainerScrollChild")
  })

  test("a config stating no HUD layout answers none", () => {
    expect(hudLayoutIn({ version: 1 })).toBeUndefined()
  })

  test("the empty name the add-on ships answers no layout", () => {
    expect(hudLayoutIn(undefined)).toBeUndefined()
  })

  test("a config stating no version above zero answers no layout", () => {
    expect(hudLayoutIn({ version: 0, hudLayout: LAYOUT })).toBeUndefined()
    expect(hudLayoutIn({ hudLayout: LAYOUT })).toBeUndefined()
  })
})
