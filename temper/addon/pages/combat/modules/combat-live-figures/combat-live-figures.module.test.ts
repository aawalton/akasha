import { describe, expect, test } from "bun:test"
import {
  FIRST_LIVE_FIGURE_ORDER,
  hasFightFigures,
  LIVE_FIGURE_KEYS,
  type LiveFiguresShown,
  type LiveFigureTexts,
  liveFigureCell,
  liveFigureOrder,
} from "akasha/temper/addon/pages/combat/modules/combat-live-figures/combat-live-figures.module.code.ts"

const ALL_SHOWN: LiveFiguresShown = {
  damageOutSingle: true,
  damageOut: true,
  healOut: true,
  healOutAbsolute: true,
  damageIn: true,
  healIn: true,
  time: true,
}

const TEXTS: LiveFigureTexts = {
  damageOutSingle: "0",
  damageOut: "41250",
  healOut: "3100",
  healOutAbsolute: "3900",
  damageIn: "8800",
  healIn: "2700",
  time: "1:12.4",
}

describe("combat-live-figures", () => {
  test("the figures keep the live report's order", () => {
    expect(LIVE_FIGURE_KEYS).toEqual([
      "damageOutSingle",
      "damageOut",
      "healOut",
      "healOutAbsolute",
      "damageIn",
      "healIn",
      "time",
    ])
  })

  test("each figure takes the next order on the bar", () => {
    expect(LIVE_FIGURE_KEYS.map(liveFigureOrder)).toEqual([70, 71, 72, 73, 74, 75, 76])
    expect(liveFigureOrder("damageOutSingle")).toBe(FIRST_LIVE_FIGURE_ORDER)
  })

  test("a fight with nothing dealt, healed or taken has no figures", () => {
    expect(hasFightFigures(0, 0, 0)).toBe(false)
    expect(hasFightFigures(0, 0, 5)).toBe(true)
    expect(hasFightFigures(12, 0, 0)).toBe(true)
  })

  test("a shown figure draws its text", () => {
    expect(liveFigureCell("damageOut", ALL_SHOWN, TEXTS)).toEqual({ text: "41250" })
  })

  test("a figure its setting hides draws nothing", () => {
    expect(liveFigureCell("damageOut", { ...ALL_SHOWN, damageOut: false }, TEXTS)).toEqual({
      text: "",
    })
  })

  test("no fight yet draws nothing", () => {
    expect(liveFigureCell("time", ALL_SHOWN, undefined)).toEqual({ text: "" })
  })
})
