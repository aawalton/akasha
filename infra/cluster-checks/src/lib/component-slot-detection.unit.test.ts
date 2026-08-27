import { describe, expect, test } from "bun:test"

import { isCompoundSlotInBoundedFamily } from "./component-slot-detection.ts"
import type { ClassUsage } from "./jsx-class-tokens.ts"

function namesOf(
  usages: readonly ClassUsage[],
  extra: readonly string[] = []
): ReadonlySet<string> {
  const names = new Set<string>(extra)
  for (const u of usages) if (u.enclosingComponent !== null) names.add(u.enclosingComponent)
  return names
}

const FILE = "test.tsx"

function usage(partial: Partial<ClassUsage>): ClassUsage {
  return {
    filename: FILE,
    line: partial.line ?? 1,
    column: partial.column ?? 1,
    isRootElement: partial.isRootElement ?? false,
    tagName: partial.tagName ?? null,
    jsxTagName: partial.jsxTagName ?? null,
    tokens: partial.tokens ?? [],
    callExpressionNames: partial.callExpressionNames ?? [],
    dataSlot: partial.dataSlot ?? null,
    enclosingComponent: partial.enclosingComponent ?? null,
  }
}

describe("isCompoundSlotInBoundedFamily", () => {
  test("non-root element returns false", () => {
    const target = usage({
      isRootElement: false,
      dataSlot: "input-group-addon",
      enclosingComponent: "InputGroupAddon",
    })
    expect(isCompoundSlotInBoundedFamily([target], target, namesOf([target]))).toBe(false)
  })

  test("missing data-slot returns false", () => {
    const target = usage({
      isRootElement: true,
      dataSlot: null,
      enclosingComponent: "InputGroupAddon",
    })
    expect(isCompoundSlotInBoundedFamily([target], target, namesOf([target]))).toBe(false)
  })

  test("data-slot matching own component name (no strict-prefix sibling) returns false", () => {
    const root = usage({
      isRootElement: true,
      dataSlot: "input-group",
      enclosingComponent: "InputGroup",
      tokens: ["border"],
    })
    expect(isCompoundSlotInBoundedFamily([root], root, namesOf([root]))).toBe(false)
  })

  test("slot in family where the family root has a boundary returns true", () => {
    const inputGroupRoot = usage({
      isRootElement: true,
      enclosingComponent: "InputGroup",
      callExpressionNames: ["surfaceClass"],
    })
    const addonRoot = usage({
      isRootElement: true,
      dataSlot: "input-group-addon",
      enclosingComponent: "InputGroupAddon",
      tokens: ["px-3", "py-1.5"],
    })
    const usages = [inputGroupRoot, addonRoot]
    expect(isCompoundSlotInBoundedFamily(usages, addonRoot, namesOf(usages))).toBe(true)
  })

  test("slot exempt when the boundary lives on a non-root usage of a Portal-wrapped sibling", () => {
    const dropdown = usage({
      isRootElement: true,
      enclosingComponent: "DropdownMenu",
    })
    const contentInner = usage({
      isRootElement: false,
      enclosingComponent: "DropdownMenuContent",
      callExpressionNames: ["surfaceClass"],
    })
    const labelRoot = usage({
      isRootElement: true,
      dataSlot: "dropdown-menu-label",
      enclosingComponent: "DropdownMenuLabel",
      tokens: ["px-2", "py-1.5"],
    })
    const usages = [dropdown, contentInner, labelRoot]
    expect(isCompoundSlotInBoundedFamily(usages, labelRoot, namesOf(usages))).toBe(true)
  })

  test("family root with no className usages still anchors a family when present in componentNames", () => {
    const contentInner = usage({
      isRootElement: false,
      enclosingComponent: "DropdownMenuContent",
      callExpressionNames: ["surfaceClass"],
    })
    const labelRoot = usage({
      isRootElement: true,
      dataSlot: "dropdown-menu-label",
      enclosingComponent: "DropdownMenuLabel",
      tokens: ["px-2", "py-1.5"],
    })
    const usages = [contentInner, labelRoot]
    expect(
      isCompoundSlotInBoundedFamily(usages, labelRoot, namesOf(usages, ["DropdownMenu"]))
    ).toBe(true)
  })

  test("slot in family where no member paints a boundary returns false", () => {
    const stackRoot = usage({
      isRootElement: true,
      enclosingComponent: "Stack",
      tokens: ["flex", "flex-col", "gap-2"],
    })
    const itemRoot = usage({
      isRootElement: true,
      dataSlot: "stack-item",
      enclosingComponent: "StackItem",
      tokens: ["px-3", "py-1.5"],
    })
    const usages = [stackRoot, itemRoot]
    expect(isCompoundSlotInBoundedFamily(usages, itemRoot, namesOf(usages))).toBe(false)
  })

  test("longest strict-prefix sibling wins when nested compound families coexist", () => {
    const subContentInner = usage({
      isRootElement: false,
      enclosingComponent: "DropdownMenuSubContent",
      tokens: ["bg-popover", "border"],
    })
    const subTrigger = usage({
      isRootElement: true,
      dataSlot: "dropdown-menu-sub-trigger",
      enclosingComponent: "DropdownMenuSubTrigger",
      tokens: ["px-2", "py-1.5"],
    })
    const usages = [subContentInner, subTrigger]
    const componentNames = namesOf(usages, ["DropdownMenu", "DropdownMenuSub"])
    expect(isCompoundSlotInBoundedFamily(usages, subTrigger, componentNames)).toBe(true)
  })

  test("slot whose data-slot has no shorter sibling export returns false (no family)", () => {
    const lone = usage({
      isRootElement: true,
      dataSlot: "foo-bar",
      enclosingComponent: "FooBar",
      tokens: ["px-2"],
    })
    expect(isCompoundSlotInBoundedFamily([lone], lone, namesOf([lone]))).toBe(false)
  })
})
