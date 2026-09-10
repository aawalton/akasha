import { expect, test } from "bun:test"
import { bodiesAt } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { reasonsIn } from "./instant-property-slug-closes-with-at.code-check.code.ts"

const ROOT = "/repo"

const UNDER: ReadonlySet<string> = new Set(["instant-property"])

const given = bodiesAt(ROOT, "akasha/created-at.instant-property.ts")

const judge = reasonsIn(UNDER)

test("the body judged is the one the change carries", () => {
  const body =
    'export const held = {\n  pageTypeSlug: "instant-property",\n  slug: "created",\n} as const satisfies InstantProperty\n'
  expect(judge(given(body))).toHaveLength(1)
})

test("a file that is not TypeScript is passed over", () => {
  const held = { root: ROOT, path: "akasha/notes.txt", bytes: new TextEncoder().encode("created") }
  expect(judge(held)).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => judge(held)).toThrow("akasha/raw.ts")
  expect(() => judge(held)).toThrow("not valid UTF-8")
})
