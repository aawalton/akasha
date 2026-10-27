import { describe, expect, test } from "bun:test"
import {
  type HudDock,
  type HudPanelBox,
  placeHudPanels,
} from "akasha/temper/addon/pages/temper-core/modules/hud-layout-place/hud-layout-place.module.code.ts"

const SCREEN = { width: 1000, height: 500 }

const GAPS: Record<HudDock, number> = {
  "top-left": 10,
  top: 10,
  "top-right": 10,
  left: 10,
  right: 10,
  "bottom-left": 10,
  bottom: 10,
  "bottom-right": 10,
}

function panel(key: string, dock: HudDock, displayOrder: number, height: number): HudPanelBox {
  return {
    key,
    dock,
    displayOrder,
    top: 0,
    height,
    hidden: false,
    neverMoves: false,
    shrinks: false,
  }
}

describe("placeHudPanels", () => {
  test("a top dock stacks its panels downward, one gap apart, in display order", () => {
    const places = placeHudPanels(
      SCREEN,
      [panel("b", "top-right", 2, 40), panel("a", "top-right", 1, 100)],
      GAPS
    )
    expect(places).toEqual([
      { key: "a", point: "TOPRIGHT", offsetX: -10, offsetY: 10, room: 100 },
      { key: "b", point: "TOPRIGHT", offsetX: -10, offsetY: 120, room: 40 },
    ])
  })

  test("a bottom dock stacks its panels upward", () => {
    const places = placeHudPanels(
      SCREEN,
      [panel("a", "bottom", 1, 50), panel("b", "bottom", 2, 30)],
      GAPS
    )
    expect(places).toEqual([
      { key: "a", point: "BOTTOM", offsetX: 0, offsetY: -10, room: 50 },
      { key: "b", point: "BOTTOM", offsetX: 0, offsetY: -70, room: 30 },
    ])
  })

  test("a hidden panel takes no room and leaves no gap", () => {
    const hidden = { ...panel("a", "top-left", 1, 100), hidden: true }
    const places = placeHudPanels(SCREEN, [hidden, panel("b", "top-left", 2, 40)], GAPS)
    expect(places).toEqual([{ key: "b", point: "TOPLEFT", offsetX: 10, offsetY: 10, room: 40 }])
  })

  test("a panel that never moves begins its dock and is not placed", () => {
    const bar = { ...panel("bar", "bottom", 5, 70), neverMoves: true, top: 400 }
    const places = placeHudPanels(SCREEN, [panel("a", "bottom", 1, 30), bar], GAPS)
    expect(places).toEqual([{ key: "a", point: "BOTTOM", offsetX: 0, offsetY: -110, room: 30 }])
  })

  test("a middle dock is centred, between the corner docks of its edge", () => {
    const places = placeHudPanels(SCREEN, [panel("m", "right", 1, 100)], GAPS)
    expect(places).toEqual([{ key: "m", point: "TOPRIGHT", offsetX: -10, offsetY: 200, room: 100 }])
  })

  test("a middle dock is pushed below a top corner that reaches past the centre", () => {
    const places = placeHudPanels(
      SCREEN,
      [panel("t", "top-right", 1, 250), panel("m", "right", 1, 100)],
      GAPS
    )
    expect(places[1]).toEqual({
      key: "m",
      point: "TOPRIGHT",
      offsetX: -10,
      offsetY: 270,
      room: 100,
    })
  })

  test("a panel that shrinks is given the room the other dock of its edge leaves", () => {
    const tasks = { ...panel("tasks", "top-right", 1, 400), shrinks: true }
    const places = placeHudPanels(SCREEN, [tasks, panel("loot", "bottom-right", 1, 200)], GAPS)
    expect(places).toEqual([
      { key: "tasks", point: "TOPRIGHT", offsetX: -10, offsetY: 10, room: 270 },
      { key: "loot", point: "BOTTOMRIGHT", offsetX: -10, offsetY: -10, room: 200 },
    ])
  })

  test("a panel that does not shrink keeps its height where the edge is too short", () => {
    const places = placeHudPanels(
      SCREEN,
      [panel("a", "top-left", 1, 400), panel("b", "bottom-left", 1, 200)],
      GAPS
    )
    expect(places.map((place) => place.room)).toEqual([400, 200])
  })
})
