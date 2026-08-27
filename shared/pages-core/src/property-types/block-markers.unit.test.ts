import { describe, expect, it } from "bun:test"
import {
  healBlockMarker,
  isMarkerType,
  isTodoChecked,
  leadingMarker,
  markerFor,
  nextNumberedMarker,
  stripLeadingMarker,
  toggleTodoMarker,
} from "./block-markers"

describe("isMarkerType", () => {
  it("recognizes the four marker-bearing types and rejects the rest", () => {
    expect(isMarkerType("bulleted-list-item")).toBe(true)
    expect(isMarkerType("numbered-list-item")).toBe(true)
    expect(isMarkerType("to-do")).toBe(true)
    expect(isMarkerType("toggle")).toBe(true)
    expect(isMarkerType("paragraph")).toBe(false)
    expect(isMarkerType("heading")).toBe(false)
  })
})

describe("leadingMarker", () => {
  it("parses a bullet marker", () => {
    expect(leadingMarker("- hi")).toEqual({ kind: "bulleted-list-item", marker: "- " })
  })
  it("parses a numbered marker with its integer", () => {
    expect(leadingMarker("12. hi")).toEqual({
      kind: "numbered-list-item",
      marker: "12. ",
      number: 12,
    })
  })
  it("parses an unchecked and a checked to-do marker", () => {
    expect(leadingMarker("[ ] hi")).toEqual({ kind: "to-do", marker: "[ ] ", checked: false })
    expect(leadingMarker("[x] hi")).toEqual({ kind: "to-do", marker: "[x] ", checked: true })
    expect(leadingMarker("[X] hi")).toEqual({ kind: "to-do", marker: "[X] ", checked: true })
  })
  it("parses a toggle marker (#15038)", () => {
    expect(leadingMarker("> Section")).toEqual({ kind: "toggle", marker: "> " })
  })
  it("returns null when no marker leads the text", () => {
    expect(leadingMarker("plain text")).toBeNull()
    expect(leadingMarker("-no space")).toBeNull()
    expect(leadingMarker(">no space")).toBeNull()
    expect(leadingMarker("")).toBeNull()
  })
})

describe("markerFor", () => {
  it("returns the literal marker per type", () => {
    expect(markerFor("bulleted-list-item")).toBe("- ")
    expect(markerFor("numbered-list-item", { ordinal: 3 })).toBe("3. ")
    expect(markerFor("numbered-list-item")).toBe("1. ")
    expect(markerFor("to-do")).toBe("[ ] ")
    expect(markerFor("to-do", { checked: true })).toBe("[x] ")
    expect(markerFor("toggle")).toBe("> ")
  })
})

describe("stripLeadingMarker", () => {
  it("removes a leading marker of any type, else returns text unchanged", () => {
    expect(stripLeadingMarker("- hi")).toBe("hi")
    expect(stripLeadingMarker("4. hi")).toBe("hi")
    expect(stripLeadingMarker("[x] hi")).toBe("hi")
    expect(stripLeadingMarker("> hi")).toBe("hi")
    expect(stripLeadingMarker("plain")).toBe("plain")
  })
})

describe("isTodoChecked / toggleTodoMarker", () => {
  it("reports checked-ness from the literal marker", () => {
    expect(isTodoChecked("[x] hi")).toBe(true)
    expect(isTodoChecked("[ ] hi")).toBe(false)
    expect(isTodoChecked("- hi")).toBe(false)
  })
  it("flips the to-do marker in place, preserving content", () => {
    expect(toggleTodoMarker("[ ] buy milk")).toBe("[x] buy milk")
    expect(toggleTodoMarker("[x] buy milk")).toBe("[ ] buy milk")
  })
  it("leaves non-to-do text unchanged", () => {
    expect(toggleTodoMarker("- hi")).toBe("- hi")
    expect(toggleTodoMarker("plain")).toBe("plain")
  })
})

describe("nextNumberedMarker", () => {
  it("increments the current number, or starts at 1", () => {
    expect(nextNumberedMarker("3. hi")).toBe("4. ")
    expect(nextNumberedMarker("- hi")).toBe("1. ")
    expect(nextNumberedMarker("plain")).toBe("1. ")
  })
})

describe("healBlockMarker (read-time migration)", () => {
  it("injects a bullet marker into legacy marker-less text", () => {
    expect(healBlockMarker({ id: "a", type: "bulleted-list-item", text: "milk" }, 0)).toEqual({
      id: "a",
      type: "bulleted-list-item",
      text: "- milk",
    })
  })
  it("injects a numbered marker using the supplied ordinal", () => {
    expect(healBlockMarker({ id: "a", type: "numbered-list-item", text: "step" }, 2)).toEqual({
      id: "a",
      type: "numbered-list-item",
      text: "2. step",
    })
  })
  it("derives a to-do marker from the legacy checked field and drops that field", () => {
    expect(healBlockMarker({ id: "a", type: "to-do", text: "task", checked: true }, 0)).toEqual({
      id: "a",
      type: "to-do",
      text: "[x] task",
    })
    expect(healBlockMarker({ id: "a", type: "to-do", text: "task", checked: false }, 0)).toEqual({
      id: "a",
      type: "to-do",
      text: "[ ] task",
    })
  })
  it("injects a toggle '> ' marker into legacy marker-less toggle text (#15038)", () => {
    expect(healBlockMarker({ id: "a", type: "toggle", text: "Section" }, 0)).toEqual({
      id: "a",
      type: "toggle",
      text: "> Section",
    })
  })
  it("is idempotent: keeps already-marked text verbatim and only strips checked", () => {
    expect(
      healBlockMarker({ id: "a", type: "to-do", text: "[x] done", checked: false }, 0)
    ).toEqual({ id: "a", type: "to-do", text: "[x] done" })
    expect(healBlockMarker({ id: "a", type: "bulleted-list-item", text: "- kept" }, 0)).toEqual({
      id: "a",
      type: "bulleted-list-item",
      text: "- kept",
    })
    const toggle = { id: "b", type: "toggle", text: "> kept" }
    expect(healBlockMarker(toggle, 0)).toBe(toggle)
  })
  it("leaves a non-marker block untouched", () => {
    const p = { id: "a", type: "paragraph", text: "hi" }
    expect(healBlockMarker(p, 0)).toBe(p)
  })
})
