import { expect, test } from "bun:test"
import { FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import {
  FOCUS_TEMPLATES,
  isSessionFocus,
  NATIVE_PATTERN_BY_ROLE,
  NATIVE_PATTERNS,
  ROLE_DEFAULTS,
  ROLE_OPTIONS,
  slotsForFocus,
} from "./slot-templates.module.code.ts"

test("every focus a session may take has a template", () => {
  for (const focus of FOCUS_OPTIONS) {
    expect(FOCUS_TEMPLATES[focus].length).toBeGreaterThan(0)
  }
})

test("a focus no template names is trained as full body", () => {
  expect(slotsForFocus("rest")).toBe(FOCUS_TEMPLATES["full-body"])
  expect(slotsForFocus("")).toBe(FOCUS_TEMPLATES["full-body"])
})

test("a focus a template names gets that template", () => {
  expect(slotsForFocus("push")).toBe(FOCUS_TEMPLATES.push)
})

test("only a focus the vocabulary names is a session focus", () => {
  expect(isSessionFocus("push")).toBe(true)
  expect(isSessionFocus("rest")).toBe(false)
})

test("every role has defaults", () => {
  for (const role of ROLE_OPTIONS) {
    expect(ROLE_DEFAULTS[role].targetSets).toBeGreaterThan(0)
  }
})

test("a rep range never runs backwards", () => {
  for (const role of ROLE_OPTIONS) {
    const defaults = ROLE_DEFAULTS[role]
    expect(defaults.repRangeHigh).toBeGreaterThanOrEqual(defaults.repRangeLow)
  }
})

test("every slot names at least one pattern", () => {
  for (const focus of FOCUS_OPTIONS) {
    for (const slot of FOCUS_TEMPLATES[focus]) {
      expect(slot.patterns.length).toBeGreaterThan(0)
    }
  }
})

test("a native pattern is claimed by the role it belongs to", () => {
  expect(NATIVE_PATTERN_BY_ROLE.mobility).toBe("mobility")
  expect(NATIVE_PATTERN_BY_ROLE.conditioning).toBe("conditioning")
  expect([...NATIVE_PATTERNS].sort()).toEqual(["conditioning", "mobility"])
})

test("a native pattern is asked for only by the role that claims it", () => {
  for (const focus of FOCUS_OPTIONS) {
    for (const slot of FOCUS_TEMPLATES[focus]) {
      for (const pattern of slot.patterns) {
        if (!NATIVE_PATTERNS.has(pattern)) continue
        expect(NATIVE_PATTERN_BY_ROLE[slot.role]).toBe(pattern)
      }
    }
  }
})

test("a template that anchors anchors on its first slot alone", () => {
  for (const focus of FOCUS_OPTIONS) {
    const anchors = FOCUS_TEMPLATES[focus].filter((slot) => slot.role === "anchor")
    expect(anchors.length).toBeLessThanOrEqual(1)
    if (anchors[0] !== undefined) expect(FOCUS_TEMPLATES[focus][0]).toBe(anchors[0])
  }
})
