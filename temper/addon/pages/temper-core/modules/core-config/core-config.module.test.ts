import { describe, expect, test } from "bun:test"
import {
  type HudLayout,
  hudLayoutIn,
} from "akasha/temper/addon/pages/temper-core/modules/core-config/core-config.module.code.ts"

const LAYOUT: HudLayout = {
  docks: { bottom: { gap: 10 } },
  panels: [{ control: "ZO_ActionBar1", dock: "bottom", order: 1, fixed: true }],
}

describe("core-config", () => {
  test("a config the watcher wrote answers its HUD layout", () => {
    expect(hudLayoutIn({ version: 1, hudLayout: LAYOUT })).toEqual(LAYOUT)
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
