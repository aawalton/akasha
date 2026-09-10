import { expect, test } from "bun:test"
import { reasonsAt } from "./instant-property-slug-closes-with-at.code-check.decision.code.ts"

const AT = "akasha/created-at.instant-property.ts"

const UNDER: ReadonlySet<string> = new Set(["instant-property", "stamped-property"])

function judge(text: string, path: string = AT): readonly string[] {
  return reasonsAt(path, text, UNDER)
}

function page(pageTypeSlug: string, slug: string): string {
  return `export const held = {\n  pageTypeSlug: "${pageTypeSlug}",\n  slug: "${slug}",\n} as const satisfies InstantProperty\n`
}

test("an instant property whose slug closes with `-at` is let through", () => {
  expect(judge(page("instant-property", "created-at"))).toEqual([])
})

test("an instant property whose slug does not close with `-at` is refused", () => {
  const said = judge(page("instant-property", "created"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("names itself `created`")
})

test("a page type sitting under `instant-property` is judged as `instant-property` is", () => {
  const said = judge(page("stamped-property", "created"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`stamped-property`")
})

test("a page of a page type sitting elsewhere is passed over", () => {
  expect(judge(page("text-property", "created"))).toEqual([])
})

test("a slug closing with `at` and no dash before it is refused", () => {
  expect(judge(page("instant-property", "createdat"))).toHaveLength(1)
})

test("a file holding no page value is passed over", () => {
  expect(judge('export function one(): string {\n  return "created"\n}\n')).toEqual([])
})

test("a page stating no page type is passed over", () => {
  const body = 'export const held = {\n  slug: "created",\n} as const satisfies InstantProperty\n'
  expect(judge(body)).toEqual([])
})

test("a page whose slug is not written out as text is passed over", () => {
  const body = [
    "export const held = {",
    '  pageTypeSlug: "instant-property",',
    "  slug: HELD,",
    "} as const satisfies InstantProperty",
  ].join("\n")
  expect(judge(body)).toEqual([])
})

test("a page type the index holds under nothing is passed over", () => {
  expect(reasonsAt(AT, page("instant-property", "created"), new Set())).toEqual([])
})

test("a file describing an instant property rather than being one is passed over", () => {
  const body =
    'export const held = {\n  pageTypeSlug: "instant-property",\n  slug: "not-closing",\n} as const\n'
  expect(judge(body, "akasha/made-up.test.ts")).toEqual([])
})

test("a file beside an instant property rather than holding one is passed over", () => {
  const body =
    'export const held = {\n  pageTypeSlug: "instant-property",\n  slug: "created",\n} as const\n'
  expect(judge(body, "akasha/created-at.instant-property.code.ts")).toEqual([])
})
