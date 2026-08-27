import { expect, test } from "bun:test"
import { windowOf } from "./sweep-editor-pages.ts"

test("a group or tab belongs to the window whose whole name begins it", () => {
  const live = new Set(["2993933-11211751"])
  expect(windowOf("2993933-11211751-1", live)).toBe("2993933-11211751")
  expect(windowOf("2993933-11211751-1-6", live)).toBe("2993933-11211751")
})

test("a window named with either separator claims its own groups and tabs", () => {
  const live = new Set(["2813987.11159292"])
  expect(windowOf("2813987.11159292-1", live)).toBe("2813987.11159292")
  expect(windowOf("2813987.11159292-1-2", live)).toBe("2813987.11159292")
})

test("a name no live window begins belongs to none", () => {
  expect(windowOf("2813987-11159292-1", new Set(["2993933-11211751"]))).toBeNull()
  expect(windowOf("2993933-11211751-1", new Set())).toBeNull()
})

test("a window's name is matched whole, never as the head of a longer one", () => {
  expect(windowOf("29939331-1", new Set(["2993933"]))).toBeNull()
})

test("where two live windows both begin a name, the longer one owns it", () => {
  const live = new Set(["2993933", "2993933-11211751"])
  expect(windowOf("2993933-11211751-1", live)).toBe("2993933-11211751")
})
