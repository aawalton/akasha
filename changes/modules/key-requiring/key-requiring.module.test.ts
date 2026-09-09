import { expect, test } from "bun:test"
import { worldAt } from "../shadow/change-shadow.module.code.ts"
import { requiredIn } from "./key-requiring.module.code.ts"

const ROOT = "/var/tmp/key-requiring"

const PAGE = "akasha/one/held.module.ts"

const TYPE = "akasha/one/held.page-type.ts"

const DECLARED = `export type Held = {
  slug: string
  definition?: string
  partSlugs?: readonly string[]
}
`

const BODY = `import type { Held } from "./held.page-type.ts"

export const held = {
  slug: "held",
  definition: "one thing",
} as const satisfies Held
`

const BARE = `import type { Held } from "./held.page-type.ts"

export type Also = Held
`

function holding(body: string): (path: string) => string | null {
  return (path) => {
    if (path === PAGE) return body
    return path === TYPE ? DECLARED : null
  }
}

function requiring(key: string, textOf: (path: string) => string | null): boolean | null {
  return requiredIn(worldAt(ROOT, textOf), { at: PAGE, key })
}

test("a key the type marks neither absent nor optional is required", () => {
  expect(requiring("slug", holding(BODY))).toBe(true)
})

test("a key the type marks optional is not required", () => {
  expect(requiring("definition", holding(BODY))).toBe(false)
})

test("a key the type marks optional is not required though the body holds no value under it", () => {
  expect(requiring("partSlugs", holding(BODY))).toBe(false)
})

test("a key the type states no property under is not required", () => {
  expect(requiring("cover", holding(BODY))).toBe(false)
})

test("a page that could not be read is answered as neither required nor not", () => {
  expect(requiring("slug", () => null)).toBe(null)
})

test("a page holding no literal is answered as neither required nor not", () => {
  expect(requiring("slug", holding(BARE))).toBe(null)
})

test("a type that could not be read is answered as neither required nor not", () => {
  const textOf = (path: string): string | null => (path === PAGE ? BODY : null)
  expect(requiring("slug", textOf)).toBe(null)
})
