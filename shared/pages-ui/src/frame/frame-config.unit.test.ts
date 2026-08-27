import { describe, expect, test } from "bun:test"
import {
  frameEnablesFollow,
  frameFollowMode,
  frameIsEdgeToEdge,
  frameLoadScroll,
  frameSupportsFocusMode,
} from "./frame-config"

describe("frame-config readers", () => {
  test("frameIsEdgeToEdge", () => {
    expect(frameIsEdgeToEdge(undefined)).toBe(false)
    expect(frameIsEdgeToEdge({})).toBe(false)
    expect(frameIsEdgeToEdge({ edgeToEdge: false })).toBe(false)
    expect(frameIsEdgeToEdge({ edgeToEdge: true })).toBe(true)
  })

  test("frameSupportsFocusMode", () => {
    expect(frameSupportsFocusMode(undefined)).toBe(false)
    expect(frameSupportsFocusMode({})).toBe(false)
    expect(frameSupportsFocusMode({ focusMode: true })).toBe(true)
  })

  test("frameLoadScroll", () => {
    expect(frameLoadScroll(undefined)).toBeUndefined()
    expect(frameLoadScroll({})).toBeUndefined()
    expect(frameLoadScroll({ autoScroll: {} })).toBeUndefined()
    expect(frameLoadScroll({ autoScroll: { loadScroll: "end" } })).toBe("end")
    expect(frameLoadScroll({ autoScroll: { loadScroll: "progress" } })).toBe("progress")
    expect(frameLoadScroll({ autoScroll: { loadScroll: "start" } })).toBe("start")
    expect(frameLoadScroll({ autoScroll: { loadScroll: "new-top" } })).toBe("new-top")
  })

  test("frameFollowMode — 'end' is bottom-anchored, 'new-top' is top-anchored, else null", () => {
    expect(frameFollowMode(undefined)).toBeNull()
    expect(frameFollowMode({})).toBeNull()
    expect(frameFollowMode({ autoScroll: { loadScroll: "end" } })).toBe("bottom")
    expect(frameFollowMode({ autoScroll: { loadScroll: "new-top" } })).toBe("top")
    expect(frameFollowMode({ autoScroll: { loadScroll: "progress" } })).toBeNull()
    expect(frameFollowMode({ autoScroll: { loadScroll: "start" } })).toBeNull()
  })

  test("frameEnablesFollow — both 'end' and 'new-top' follow; start/progress do not", () => {
    expect(frameEnablesFollow(undefined)).toBe(false)
    expect(frameEnablesFollow({ autoScroll: { loadScroll: "end" } })).toBe(true)
    expect(frameEnablesFollow({ autoScroll: { loadScroll: "new-top" } })).toBe(true)
    expect(frameEnablesFollow({ autoScroll: { loadScroll: "progress" } })).toBe(false)
    expect(frameEnablesFollow({ autoScroll: { loadScroll: "start" } })).toBe(false)
  })
})
