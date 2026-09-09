import { expect, test } from "bun:test"
import { foundIn, statedIn } from "./id-is-a-uuid-version-7.code-check.decision.code.ts"

const AT = "akasha/held.check.ts"

function page(id: string): readonly string[] {
  return foundIn(
    AT,
    `export const held = {\n  id: "${id}",\n  slug: "held",\n} as const satisfies Check\n`
  )
}

test("a page stating a lowercase uuid version 7 is let through", () => {
  expect(page("01a04b5e-39e5-7730-9318-c34e7807c200")).toEqual([])
})

test("a page stating a uuid of another version is refused, and names the version", () => {
  const said = page("50bd1069-098f-5eeb-be75-5b1108edd857")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is a uuid version 5")
})

test("a page stating a uuid version 7 in upper uuid is refused for its case alone", () => {
  const said = page("01A04B5E-39E5-7730-9318-C34E7807C200")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("upper uuid")
})

test("a uuid carrying a variant no version 7 carries is refused", () => {
  const said = page("01a04b5e-39e5-7730-c318-c34e7807c200")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("variant `c`")
})

test("an id that is no uuid at all is refused for that rather than its version", () => {
  const said = page("held-1")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is not a uuid")
})

test("the line the id sits on is named, so a reader reaches it without searching", () => {
  expect(page("held-1")[0]).toContain("line 2")
})

test("a file stating no page is passed over", () => {
  expect(foundIn(AT, 'export function one(): string {\n  return "id"\n}\n')).toEqual([])
})

test("text shaped like an id outside the object literal is not the stated id", () => {
  const body = [
    'const held = "50bd1069-098f-5eeb-be75-5b1108edd857"',
    "export const one = {",
    '  id: "01a04b5e-39e5-7730-9318-c34e7807c200",',
    "} as const satisfies Check",
  ].join("\n")
  expect(foundIn(AT, body)).toEqual([])
})

test("every page a file states is judged, not just the first", () => {
  const body = [
    'export const one = {\n  id: "50bd1069-098f-5eeb-be75-5b1108edd857",\n} as const satisfies Check',
    'export const two = {\n  id: "held-2",\n} as const satisfies Check',
  ].join("\n")
  expect(foundIn(AT, body)).toHaveLength(2)
})

test("an id nested deeper than the page's own properties is not the stated id", () => {
  const body = [
    "export const one = {",
    '  id: "01a04b5e-39e5-7730-9318-c34e7807c200",',
    '  rule: [{ id: "held-1" }],',
    "} as const satisfies Check",
  ].join("\n")
  expect(foundIn(AT, body)).toEqual([])
})

test("a value the file keeps to itself states no page, so it is passed over", () => {
  expect(foundIn(AT, 'const one = {\n  id: "held-1",\n} as const satisfies Check\n')).toEqual([])
})

test("an object written without `satisfies` is no page, so it is passed over", () => {
  expect(foundIn(AT, 'export const one = {\n  id: "held-1",\n}\n')).toEqual([])
})

test("an id that is not written out as text is left unjudged rather than refused", () => {
  const body = "export const one = {\n  id: HELD,\n} as const satisfies Check\n"
  expect(foundIn(AT, body)).toEqual([])
  expect(statedIn(AT, body)).toEqual([])
})

test("a page stating no id at all is passed over", () => {
  expect(
    foundIn(AT, 'export const one = {\n  slug: "held",\n} as const satisfies Check\n')
  ).toEqual([])
})

test("the id is read whichever line it is written on", () => {
  const body = [
    "export const one = {",
    '  slug: "held",',
    '  pageTypeSlug: "check",',
    '  id: "held-1",',
    "} as const satisfies Check",
  ].join("\n")
  const said = foundIn(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 4")
})
