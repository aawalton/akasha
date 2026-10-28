import { describe, expect, test } from "bun:test"
import {
  type HudDock,
  type HudPanelBox,
  placeHudPanels,
} from "akasha/temper/addon/pages/temper-core/modules/hud-layout-place/hud-layout-place.module.code.ts"

const SCREEN = { width: 1000, height: 500, top: 0 }

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
    alignment: "screen-edge",
    top: 0,
    width: 100,
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

  test("a top dock stacks from where the screen's room begins", () => {
    const places = placeHudPanels({ ...SCREEN, top: 30 }, [panel("a", "top-left", 1, 50)], GAPS)
    expect(places).toEqual([{ key: "a", point: "TOPLEFT", offsetX: 10, offsetY: 40, room: 50 }])
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

  test("a panel with no height takes no room and leaves no gap", () => {
    const places = placeHudPanels(
      SCREEN,
      [panel("empty", "top-left", 1, 0), panel("b", "top-left", 2, 40)],
      GAPS
    )
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

  test("a right-dock panel lined up with the panel before it shares that panel's left edge", () => {
    const map = { ...panel("map", "top-right", 1, 300), width: 300 }
    const tasks = { ...panel("tasks", "top-right", 2, 100), alignment: "previous-panel" as const }
    expect(placeHudPanels(SCREEN, [map, tasks], GAPS)[1]).toEqual({
      key: "tasks",
      point: "TOPLEFT",
      offsetX: 690,
      offsetY: 320,
      room: 100,
    })
  })

  test("a lined-up panel wider than the panel before it stays one gap from the edge", () => {
    const wide = { ...panel("wide", "top-right", 2, 100), width: 500 }
    const lined = { ...wide, alignment: "previous-panel" as const }
    expect(placeHudPanels(SCREEN, [panel("a", "top-right", 1, 50), lined], GAPS)[1]).toEqual({
      key: "wide",
      point: "TOPLEFT",
      offsetX: 490,
      offsetY: 70,
      room: 100,
    })
  })

  test("a left-dock panel lined up with the panel before it shares that panel's right edge", () => {
    const frames = { ...panel("frames", "top-left", 1, 50), width: 300 }
    const lined = { ...panel("boss", "top-left", 2, 50), alignment: "previous-panel" as const }
    expect(placeHudPanels(SCREEN, [frames, lined], GAPS)[1]).toEqual({
      key: "boss",
      point: "TOPRIGHT",
      offsetX: -690,
      offsetY: 70,
      room: 50,
    })
  })

  test("a lined-up panel with no shown panel before it sits against the screen edge", () => {
    const hidden = { ...panel("map", "top-right", 1, 300), hidden: true }
    const tasks = { ...panel("tasks", "top-right", 2, 100), alignment: "previous-panel" as const }
    expect(placeHudPanels(SCREEN, [hidden, tasks], GAPS)).toEqual([
      { key: "tasks", point: "TOPRIGHT", offsetX: -10, offsetY: 10, room: 100 },
    ])
  })
})
