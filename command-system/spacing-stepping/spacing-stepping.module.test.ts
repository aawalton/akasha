import { expect, test } from "bun:test"
import { bodyFor, stepsIn } from "./spacing-stepping.module.code.ts"

const STATED = [
  ":root {",
  "  --radius: 0.5rem;",
  "",
  "  --spacing-0-5: 0.125rem;",
  "  --spacing-1: 0.25rem;",
  "  --spacing-1-5: 0.375rem;",
  "  --spacing-2: 0.5rem;",
  "  --spacing-3: 0.75rem;",
  "  --spacing-4: 1rem;",
  "  --spacing-6: 1.5rem;",
  "",
  "  --bottom-nav-height: 3rem;",
  "}",
  "",
].join("\n")

const WRITTEN = [
  "import CoreGraphics",
  "",
  "let SPACING_0_5: CGFloat = 2",
  "",
  "let SPACING_1: CGFloat = 4",
  "",
  "let SPACING_1_5: CGFloat = 6",
  "",
  "let SPACING_2: CGFloat = 8",
  "",
  "let SPACING_3: CGFloat = 12",
  "",
  "let SPACING_4: CGFloat = 16",
  "",
  "let SPACING_6: CGFloat = 24",
  "",
].join("\n")

test("every spacing step the stylesheet states is read, and nothing else is", () => {
  expect(stepsIn(STATED)).toEqual([
    { name: "SPACING_0_5", px: 2 },
    { name: "SPACING_1", px: 4 },
    { name: "SPACING_1_5", px: 6 },
    { name: "SPACING_2", px: 8 },
    { name: "SPACING_3", px: 12 },
    { name: "SPACING_4", px: 16 },
    { name: "SPACING_6", px: 24 },
  ])
})

test("a measure that is no spacing step is read by nothing", () => {
  expect(stepsIn("  --radius: 0.5rem;\n  --bottom-nav-height: 3rem;\n")).toEqual([])
})

test("the Swift written from those steps is the Swift the component holds", () => {
  expect(bodyFor(stepsIn(STATED))).toBe(WRITTEN)
})

test("that Swift is the length the component's file is", () => {
  expect(new TextEncoder().encode(bodyFor(stepsIn(STATED))).length).toBe(223)
})

test("a stylesheet stating no step writes only the import", () => {
  expect(bodyFor([])).toBe("import CoreGraphics\n")
})
