import { expect, test } from "bun:test"
import { bodiesAt } from "@akasha/testing-system/bodying"
import { reasonsIn } from "./instant-property-slug-closes-with-at.code-check.code.ts"

const ROOT = "/repo"

const UNDER: ReadonlySet<string> = new Set(["instant-property", "stamped-property"])

const given = bodiesAt(ROOT, "akasha/created-at.instant-property.ts")

const judge = reasonsIn(UNDER)

function page(pageTypeSlug: string, slug: string) {
  return given(
    `export const held = {\n  pageTypeSlug: "${pageTypeSlug}",\n  slug: "${slug}",\n} as const satisfies InstantProperty\n`
  )
}

test("an instant property whose slug closes with `-at` is let through", () => {
  expect(judge(page("instant-property", "created-at"))).toEqual([])
})

test("an instant property whose slug does not close with `-at` is refused", () => {
  const said = judge(page("instant-property", "created"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `created`")
})

test("a page type standing under `instant-property` is judged as `instant-property` is", () => {
  const said = judge(page("stamped-property", "created"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`stamped-property`")
})

test("a page of a page type standing elsewhere is passed over", () => {
  expect(judge(page("text-property", "created"))).toEqual([])
})

test("a slug closing with `at` and no dash before it is refused", () => {
  expect(judge(page("instant-property", "createdat"))).toHaveLength(1)
})

test("a file holding no page value is passed over", () => {
  expect(judge(given('export function one(): string {\n  return "created"\n}\n'))).toEqual([])
})

test("a page stating no page type is passed over", () => {
  const body = 'export const held = {\n  slug: "created",\n} as const satisfies InstantProperty\n'
  expect(judge(given(body))).toEqual([])
})

test("a page whose slug is not written out as text is passed over", () => {
  const body = [
    "export const held = {",
    '  pageTypeSlug: "instant-property",',
    "  slug: HELD,",
    "} as const satisfies InstantProperty",
  ].join("\n")
  expect(judge(given(body))).toEqual([])
})

test("a file that is not TypeScript is passed over", () => {
  const held = { root: ROOT, path: "akasha/notes.txt", bytes: new TextEncoder().encode("created") }
  expect(judge(held)).toEqual([])
})

test("a path outside the akasha folder is passed over", () => {
  const outside = bodiesAt(ROOT, "tools/created.instant-property.ts")
  const body = [
    "export const held = {",
    '  pageTypeSlug: "instant-property",',
    '  slug: "created",',
    "} as const satisfies InstantProperty",
  ].join("\n")
  expect(judge(outside(body))).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => judge(held)).toThrow("akasha/raw.ts")
  expect(() => judge(held)).toThrow("not valid UTF-8")
})

test("a page type the index holds under nothing is passed over", () => {
  expect(reasonsIn(new Set())(page("instant-property", "created"))).toEqual([])
})
