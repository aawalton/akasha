import { expect, test } from "bun:test"
import { idIsAUuidVersion7 } from "./id-is-a-uuid-version-7.check.code.ts"

const ROOT = "/repo/akasha"

function given(body: string) {
  return { root: ROOT, path: `${ROOT}/held.check.ts`, bytes: Buffer.from(body, "utf8") }
}

function page(id: string) {
  return given(`export const held = {\n  id: "${id}",\n  slug: "held",\n} as const satisfies Check\n`)
}

test("a page stating a lowercase uuid version 7 is let through", () => {
  expect(idIsAUuidVersion7(page("01a04b5e-39e5-7730-9318-c34e7807c200"))).toEqual([])
})

test("a page stating a uuid of another version is refused, and names the version", () => {
  const said = idIsAUuidVersion7(page("50bd1069-098f-5eeb-be75-5b1108edd857"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is a uuid version 5")
})

test("a page stating a uuid version 7 in upper uuid is refused for its case alone", () => {
  const said = idIsAUuidVersion7(page("01A04B5E-39E5-7730-9318-C34E7807C200"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("upper uuid")
})

test("a uuid carrying a variant no version 7 carries is refused", () => {
  const said = idIsAUuidVersion7(page("01a04b5e-39e5-7730-c318-c34e7807c200"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("variant `c`")
})

test("an id that is no uuid at all is refused for that rather than its version", () => {
  const said = idIsAUuidVersion7(page("held-1"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is not a uuid")
})

test("the line the id stands on is named, so a reader reaches it without searching", () => {
  const said = idIsAUuidVersion7(page("held-1"))
  expect(said[0]).toContain("line 2")
})

test("a file stating no page is passed over", () => {
  const said = idIsAUuidVersion7(given('export function one(): string {\n  return "id"\n}\n'))
  expect(said).toEqual([])
})

test("text shaped like an id outside the object literal is not the stated id", () => {
  const body = [
    'const held = "50bd1069-098f-5eeb-be75-5b1108edd857"',
    "export const one = {",
    '  id: "01a04b5e-39e5-7730-9318-c34e7807c200",',
    "} as const satisfies Check",
  ].join("\n")
  expect(idIsAUuidVersion7(given(body))).toEqual([])
})

test("every page a file states is judged, not just the first", () => {
  const body = [
    'export const one = {\n  id: "50bd1069-098f-5eeb-be75-5b1108edd857",\n} as const satisfies Check',
    'export const two = {\n  id: "held-2",\n} as const satisfies Check',
  ].join("\n")
  expect(idIsAUuidVersion7(given(body))).toHaveLength(2)
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: `${ROOT}/raw.ts`, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(idIsAUuidVersion7(held)).toEqual([])
})
