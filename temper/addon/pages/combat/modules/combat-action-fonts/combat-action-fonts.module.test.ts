import { describe, expect, test } from "bun:test"
import {
  getLabelFont,
  getStackLabelFont,
} from "akasha/temper/addon/pages/combat/modules/combat-action-fonts/combat-action-fonts.module.code.ts"

describe("combat-action-fonts", () => {
  test("a label's face is the game's font string the setting names, expanded", () => {
    expect(
      getLabelFont({
        barLabelFontName: "BOLD_FONT",
        barLabelFontSize: 18,
        barLabelFontStyle: "thick-outline",
      })
    ).toBe("$(BOLD_FONT)|18|thick-outline")
  })

  test("a stack label's face is expanded the same way", () => {
    expect(
      getStackLabelFont({
        barStackLabelFontName: "MEDIUM_FONT",
        barStackLabelFontSize: 16,
        barStackLabelFontStyle: "soft-shadow-thick",
      })
    ).toBe("$(MEDIUM_FONT)|16|soft-shadow-thick")
  })
})
