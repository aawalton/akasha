import { afterAll, expect, test } from "bun:test"
import { found as finding } from "./no-spacing-literal.code-check.decision.code.ts"
import {
  HELD_AT,
  PASSING,
  passingAt,
  RING_AT,
  ROOT,
  reasonsIn,
  rooted,
  scratch,
  VIEW_AT,
} from "./no-spacing-literal.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function found(path: string, text: string): readonly string[] {
  return finding(PASSING, path, text)
}

function held(text: string): readonly string[] {
  return reasonsIn({ root: ROOT, path: HELD_AT, text })
}

test("a gap taken from a step by name is let through", () => {
  expect(held("VStack(spacing: SPACING_2) {\n}\n")).toEqual([])
})

test("a labelled gap written out is refused, and names the line", () => {
  const said = held("var body: some View {\n    VStack(spacing: 8) {\n    }\n}\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("spacing 8")
})

test("a padding handed a number without a label is refused", () => {
  const said = held("Text(words)\n    .padding(12)\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("padding 12")
})

test("a padding handed an edge and a number is refused", () => {
  expect(held("Text(words).padding(.horizontal, 12)\n")).toHaveLength(1)
})

test("a padding taken from a step by name is let through", () => {
  expect(held("Text(words).padding(.horizontal, SPACING_3)\n")).toEqual([])
})

test("a gap named across or down is refused as a gap named plainly is", () => {
  expect(held("Grid(horizontalSpacing: 8, verticalSpacing: 4) {\n}\n")).toHaveLength(2)
})

test("a least length written out is refused", () => {
  expect(held("Spacer(minLength: 8)\n")).toHaveLength(1)
})

test("a stroke width written out is refused where no grant names it", () => {
  const said = held("Circle().stroke(color, lineWidth: 12)\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("lineWidth 12")
})

test("a label handed anything but a number is no dimension", () => {
  expect(held("case points(lineWidth: CGFloat)\n")).toEqual([])
  expect(held("Circle().stroke(color, lineWidth: m.strokeWidth)\n")).toEqual([])
})

test("a number inside a string is no dimension", () => {
  expect(held('Text("spacing: 8 and .padding(12)")\n')).toEqual([])
})

test("a number inside a line comment is no dimension", () => {
  expect(held("// spacing: 8 and .padding(12)\n")).toEqual([])
})

test("a value Alan granted a file is let through in that file alone", () => {
  const body = "let LARGE_RING_STROKE = RingWidth.points(lineWidth: 12)\n"
  expect(found(RING_AT, body)).toEqual([])
  expect(found(HELD_AT, body)).toHaveLength(1)
})

test("a value no grant names is refused in a file holding a grant", () => {
  expect(found(RING_AT, "VStack(spacing: 8) {\n}\n")).toHaveLength(1)
})

test("a grant reaches only the value it names, not the same number of another kind", () => {
  expect(found(RING_AT, "VStack(spacing: 12) {\n}\n")).toHaveLength(1)
})

test("a granted value written a second time is let through as the first is", () => {
  const body =
    "let ONE = RingWidth.points(lineWidth: 12)\nlet TWO = RingWidth.points(lineWidth: 12)\n"
  expect(found(RING_AT, body)).toEqual([])
})

test("the gap the usage view was granted is let through there", () => {
  expect(found(VIEW_AT, "HStack(alignment: .firstTextBaseline, spacing: 1) {\n}\n")).toEqual([])
})

test("a body that is no Swift is passed over", () => {
  expect(found("alan/web/held/held.module.code.ts", "const held = { spacing: 8 }\n")).toEqual([])
})

test("every dimension a body writes out is reported, one reason each", () => {
  expect(held("VStack(spacing: 8) {\n}\nText(words).padding(12)\n")).toHaveLength(2)
})

test("a grant names its file by the page carrying that file rather than by a path", () => {
  expect([...passingAt(rooted({})).granted.keys()].sort()).toEqual([VIEW_AT, RING_AT])
})
