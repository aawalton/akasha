import { expect, test } from "bun:test"
import { bodiesAt } from "../../../testing-system/bodying.module.code.ts"
import { reasonsIn, statedIn } from "./id-is-a-uuid-version-7.check.code.ts"

const ROOT = "/repo"

const given = bodiesAt(ROOT, "akasha/held.check.ts")

function page(id: string) {
  return given(
    `export const held = {\n  id: "${id}",\n  slug: "held",\n} as const satisfies Check\n`
  )
}

test("a page stating a lowercase uuid version 7 is let through", () => {
  expect(reasonsIn(page("01a04b5e-39e5-7730-9318-c34e7807c200"))).toEqual([])
})

test("a page stating a uuid of another version is refused, and names the version", () => {
  const said = reasonsIn(page("50bd1069-098f-5eeb-be75-5b1108edd857"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is a uuid version 5")
})

test("a page stating a uuid version 7 in upper uuid is refused for its case alone", () => {
  const said = reasonsIn(page("01A04B5E-39E5-7730-9318-C34E7807C200"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("upper uuid")
})

test("a uuid carrying a variant no version 7 carries is refused", () => {
  const said = reasonsIn(page("01a04b5e-39e5-7730-c318-c34e7807c200"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("variant `c`")
})

test("an id that is no uuid at all is refused for that rather than its version", () => {
  const said = reasonsIn(page("held-1"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is not a uuid")
})

test("the line the id stands on is named, so a reader reaches it without searching", () => {
  const said = reasonsIn(page("held-1"))
  expect(said[0]).toContain("line 2")
})

test("a file stating no page is passed over", () => {
  const said = reasonsIn(given('export function one(): string {\n  return "id"\n}\n'))
  expect(said).toEqual([])
})

test("text shaped like an id outside the object literal is not the stated id", () => {
  const body = [
    'const held = "50bd1069-098f-5eeb-be75-5b1108edd857"',
    "export const one = {",
    '  id: "01a04b5e-39e5-7730-9318-c34e7807c200",',
    "} as const satisfies Check",
  ].join("\n")
  expect(reasonsIn(given(body))).toEqual([])
})

test("every page a file states is judged, not just the first", () => {
  const body = [
    'export const one = {\n  id: "50bd1069-098f-5eeb-be75-5b1108edd857",\n} as const satisfies Check',
    'export const two = {\n  id: "held-2",\n} as const satisfies Check',
  ].join("\n")
  expect(reasonsIn(given(body))).toHaveLength(2)
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(held)).toEqual([])
})

test("a file that is not TypeScript is passed over", () => {
  const held = { root: ROOT, path: "akasha/notes.txt", bytes: new TextEncoder().encode("id") }
  expect(reasonsIn(held)).toEqual([])
})

test("an id nested deeper than the page's own properties is not the stated id", () => {
  const body = [
    "export const one = {",
    '  id: "01a04b5e-39e5-7730-9318-c34e7807c200",',
    '  rule: [{ id: "held-1" }],',
    "} as const satisfies Check",
  ].join("\n")
  expect(reasonsIn(given(body))).toEqual([])
})

test("a value the file keeps to itself states no page, so it is passed over", () => {
  const body = 'const one = {\n  id: "held-1",\n} as const satisfies Check\n'
  expect(reasonsIn(given(body))).toEqual([])
})

test("an object written without `satisfies` is no page, so it is passed over", () => {
  const body = 'export const one = {\n  id: "held-1",\n}\n'
  expect(reasonsIn(given(body))).toEqual([])
})

test("an id that is not written out as text is left unjudged rather than refused", () => {
  const body = "export const one = {\n  id: HELD,\n} as const satisfies Check\n"
  expect(reasonsIn(given(body))).toEqual([])
  expect(statedIn("akasha/held.check.ts", body)).toEqual([])
})

test("a page stating no id at all is passed over", () => {
  const body = 'export const one = {\n  slug: "held",\n} as const satisfies Check\n'
  expect(reasonsIn(given(body))).toEqual([])
})

test("the id is read whichever line it stands on", () => {
  const body = [
    "export const one = {",
    '  slug: "held",',
    '  pageTypeSlug: "check",',
    '  id: "held-1",',
    "} as const satisfies Check",
  ].join("\n")
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 4")
})
