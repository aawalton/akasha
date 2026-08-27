import { describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "../types"
import { GROUP_NONE_KEY } from "./apply-grouping-shared"
import { groupKeyToPropertyValue, isBoardDraggableGroupType } from "./group-key-to-value"

const selectProp: PropertyDefinition = {
  id: "status",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "todo", label: "To Do" },
      { id: "done", label: "Done" },
    ],
  },
}
const booleanProp: PropertyDefinition = { id: "flag", title: "Flag", type: "boolean" }
const relationProp: PropertyDefinition = { id: "owner", title: "Owner", type: "relation" }
const multiSelectProp: PropertyDefinition = { id: "tags", title: "Tags", type: "multi-select" }
const dateProp: PropertyDefinition = { id: "due", title: "Due", type: "calendar-date" }
const textProp: PropertyDefinition = { id: "name", title: "Name", type: "text" }

describe("isBoardDraggableGroupType", () => {
  it("is true for select, boolean, and single relation", () => {
    expect(isBoardDraggableGroupType(selectProp)).toBe(true)
    expect(isBoardDraggableGroupType(booleanProp)).toBe(true)
    expect(isBoardDraggableGroupType(relationProp)).toBe(true)
  })

  it("is false for multi-value and derived-bucket group types", () => {
    expect(isBoardDraggableGroupType(multiSelectProp)).toBe(false)
    expect(isBoardDraggableGroupType(dateProp)).toBe(false)
    expect(isBoardDraggableGroupType(textProp)).toBe(false)
    expect(isBoardDraggableGroupType({ id: "x", title: "X", type: "multi-relation" })).toBe(false)
  })
})

describe("groupKeyToPropertyValue", () => {
  it("maps a select option key back to the option id", () => {
    expect(groupKeyToPropertyValue(selectProp, "done")).toBe("done")
  })

  it("maps the select none-sentinel to null (clears the value)", () => {
    expect(groupKeyToPropertyValue(selectProp, GROUP_NONE_KEY)).toBeNull()
  })

  it("maps a relation key back to the target id, none-sentinel to null", () => {
    expect(groupKeyToPropertyValue(relationProp, "page-123")).toBe("page-123")
    expect(groupKeyToPropertyValue(relationProp, GROUP_NONE_KEY)).toBeNull()
  })

  it("maps boolean column keys to real booleans", () => {
    expect(groupKeyToPropertyValue(booleanProp, "true")).toBe(true)
    expect(groupKeyToPropertyValue(booleanProp, "false")).toBe(false)
    expect(groupKeyToPropertyValue(booleanProp, GROUP_NONE_KEY)).toBe(false)
  })

  it("returns undefined for non-board-draggable group types (unreachable when gated)", () => {
    expect(groupKeyToPropertyValue(multiSelectProp, "a")).toBeUndefined()
    expect(groupKeyToPropertyValue(dateProp, "2026-01-01")).toBeUndefined()
  })
})
