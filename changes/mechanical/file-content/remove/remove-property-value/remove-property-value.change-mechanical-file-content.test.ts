import { expect, test } from "bun:test"
import { pathsIn } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { worldAt } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { bodyOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { removePropertyValue } from "./remove-property-value.change-mechanical-file-content.code.ts"

const ROOT = "/var/tmp/remove-property-value"

const PAGE = "akasha/one/held.module.ts"

const TYPE = "akasha/one/held.page-type.ts"

const DECLARED = `export type Held = {
  slug: string
  definition?: string
  onCall?: boolean
  partSlugs?: readonly string[]
}
`

const BODY = `import type { Held } from "./held.page-type.ts"

export const held = {
  slug: "held",
  definition: "one thing",
  onCall: true,
  partSlugs: [
    "alpha",
    "beta",
    "gamma",
  ],
} as const satisfies Held
`

function holding(body: string): (path: string) => string | null {
  return (path) => {
    if (path === PAGE) return body
    return path === TYPE ? DECLARED : null
  }
}

function saidOf(key: string, value: string, textOf: (path: string) => string | null): Answer {
  return removePropertyValue(worldAt(ROOT, textOf), { at: PAGE, key, value })
}

function bodyIn(key: string, value: string, textOf: (path: string) => string | null): string {
  return bodyOf(saidOf(key, value, textOf), textOf)
}

function whyOf(key: string, value: string, textOf: (path: string) => string | null): string {
  const said = saidOf(key, value, textOf)
  expect(said.edits).toEqual([])
  return said.refused ?? ""
}

test("one value goes out of a property holding many and the rest stay", () => {
  expect(bodyIn("partSlugs", "beta", holding(BODY))).toBe(BODY.replace(`    "beta",\n`, ""))
})

test("the first value and the last value each go out on their own", () => {
  expect(bodyIn("partSlugs", "alpha", holding(BODY))).toBe(BODY.replace(`    "alpha",\n`, ""))
  expect(bodyIn("partSlugs", "gamma", holding(BODY))).toBe(BODY.replace(`    "gamma",\n`, ""))
})

test("a property holding many keeps its key when the last value goes", () => {
  const body = BODY.replace(`    "beta",\n    "gamma",\n`, "")
  expect(bodyIn("partSlugs", "alpha", holding(body))).toContain("partSlugs: [],")
})

test("a property holding one value goes with that value", () => {
  expect(bodyIn("definition", "one thing", holding(BODY))).toBe(
    BODY.replace(`  definition: "one thing",\n`, "")
  )
})

test("a property its page's type requires is refused rather than taken away", () => {
  expect(whyOf("slug", "held", holding(BODY))).toBe(
    "`slug` is required, so taking `held` away is a retype"
  )
})

test("a value the property does not hold is refused", () => {
  expect(whyOf("partSlugs", "delta", holding(BODY))).toBe("`partSlugs` holds no `delta`")
  expect(whyOf("definition", "another", holding(BODY))).toBe("`definition` holds no `another`")
})

test("a property holding no text at all is refused", () => {
  expect(whyOf("onCall", "true", holding(BODY))).toBe("`onCall` holds no `true`")
})

test("a key the body states nothing under is refused", () => {
  expect(whyOf("cover", "x", holding(BODY))).toBe(`\`${PAGE}\` states no \`cover\``)
})

test("a body that could not be read is refused", () => {
  expect(whyOf("partSlugs", "beta", () => null)).toBe(`\`${PAGE}\` could not be read`)
})

test("a type that could not be read refuses rather than taking the property away", () => {
  const textOf = (path: string): string | null => (path === PAGE ? BODY : null)
  expect(whyOf("definition", "one thing", textOf)).toBe(
    "whether `definition` is required could not be read"
  )
})

test("the body is answered under the path it was worked out from", () => {
  const said = saidOf("partSlugs", "beta", holding(BODY))
  expect(pathsIn(said)).toEqual([PAGE])
})

test("the body is answered rather than written", () => {
  const textOf = holding(BODY)
  expect(saidOf("partSlugs", "beta", textOf).refused).toBe(null)
  expect(textOf(PAGE)).toBe(BODY)
})
