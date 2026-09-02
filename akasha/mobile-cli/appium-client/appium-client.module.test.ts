import { describe, expect, test } from "bun:test"
import {
  buildLongPressDragActions,
  extractElementId,
  pickWebviewContext,
} from "./appium-client.module.code.ts"

const ELEMENT_KEY = "element-6066-11e4-a52e-4f735466cecf"

function fingerActions(body: ReturnType<typeof buildLongPressDragActions>): readonly {
  type: string
  duration?: number
  x?: number
  y?: number
}[] {
  const finger = body.actions[0]
  if (finger === undefined) throw new Error("no finger action sequence in the /actions body")
  return finger.actions
}

describe("buildLongPressDragActions", () => {
  const spec = { x: 100, y: 200, toX: 100, toY: 440, holdMs: 800, steps: 12, stepMs: 30 }

  test("presses, holds for holdMs, then drags to the end and releases", () => {
    const acts = fingerActions(buildLongPressDragActions(spec))
    expect(acts).toHaveLength(17)
    expect(acts[0]).toMatchObject({ type: "pointerMove", duration: 0, x: 100, y: 200 })
    expect(acts[1]).toMatchObject({ type: "pointerDown" })
    expect(acts[2]).toMatchObject({ type: "pause", duration: 800 })
    expect(acts[14]).toMatchObject({ type: "pointerMove", x: 100, y: 440 })
    expect(acts.at(-1)).toMatchObject({ type: "pointerUp" })
  })

  test("interleaves the requested number of real (non-zero-duration) move steps", () => {
    const moves = fingerActions(buildLongPressDragActions(spec)).filter(
      (a) => a.type === "pointerMove" && a.duration === 30
    )
    expect(moves).toHaveLength(12)
    expect(moves[0]?.y).toBeLessThan(moves[11]?.y ?? 0)
    expect(moves[11]?.y).toBe(440)
  })

  test("a zero-travel spec is a pure long-press (all steps at the start point)", () => {
    const pureHold = buildLongPressDragActions({ ...spec, toX: 100, toY: 200 })
    for (const a of fingerActions(pureHold)) {
      if (a.type === "pointerMove") expect({ x: a.x, y: a.y }).toEqual({ x: 100, y: 200 })
    }
  })
})

describe("pickWebviewContext", () => {
  test("returns the first WEBVIEW_* context", () => {
    expect(pickWebviewContext(["NATIVE_APP", "WEBVIEW_1", "WEBVIEW_2"])).toBe("WEBVIEW_1")
  })

  test("returns undefined when only NATIVE_APP is present (webview not attached yet)", () => {
    expect(pickWebviewContext(["NATIVE_APP"])).toBeUndefined()
    expect(pickWebviewContext([])).toBeUndefined()
  })
})

describe("extractElementId", () => {
  test("extracts the W3C element reference", () => {
    expect(extractElementId({ [ELEMENT_KEY]: "abc-123" })).toBe("abc-123")
  })

  test("throws on a matched-nothing shape (no element key)", () => {
    expect(() => extractElementId({})).toThrow(/no element reference/)
    expect(() => extractElementId(null)).toThrow(/no element reference/)
    expect(() => extractElementId({ [ELEMENT_KEY]: 42 })).toThrow(/no element reference/)
  })
})
