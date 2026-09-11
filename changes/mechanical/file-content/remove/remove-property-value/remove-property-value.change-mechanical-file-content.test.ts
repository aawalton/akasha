import { expect, test } from "bun:test"
import { removePropertyValue } from "akasha/changes/mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.code.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  bodyOf,
  declaring,
  filesOf,
  worldKnowing,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"

const PAGE = "akasha/one/held.module.ts"

const DECLARED: readonly Carried[] = [
  declaring("slug", true),
  declaring("definition", false),
  declaring("onCall", false),
  declaring("partSlugs", false),
]

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

type Files = Readonly<Record<string, string>>

const FILES: Files = { [PAGE]: BODY }

function saidOf(
  key: string,
  value: string,
  bodies: Files,
  carried: readonly Carried[] | null = DECLARED
): Answer {
  return removePropertyValue(worldKnowing(bodies, carried), { at: PAGE, key, value })
}

function bodyIn(key: string, value: string, bodies: Files): string {
  return bodyOf(saidOf(key, value, bodies), filesOf(bodies))
}

function whyOf(
  key: string,
  value: string,
  bodies: Files,
  carried: readonly Carried[] | null = DECLARED
): string {
  const said = saidOf(key, value, bodies, carried)
  expect(said.edits).toEqual([])
  return said.refused ?? ""
}

test("one value goes out of a property holding many and the rest stay", () => {
  expect(bodyIn("partSlugs", "beta", FILES)).toBe(BODY.replace(`    "beta",\n`, ""))
})

test("the first value and the last value each go out on their own", () => {
  expect(bodyIn("partSlugs", "alpha", FILES)).toBe(BODY.replace(`    "alpha",\n`, ""))
  expect(bodyIn("partSlugs", "gamma", FILES)).toBe(BODY.replace(`    "gamma",\n`, ""))
})

test("a property holding many keeps its key when the last value goes", () => {
  const body = BODY.replace(`    "beta",\n    "gamma",\n`, "")
  expect(bodyIn("partSlugs", "alpha", { [PAGE]: body })).toContain("partSlugs: [],")
})

test("a property holding one value goes with that value", () => {
  expect(bodyIn("definition", "one thing", FILES)).toBe(
    BODY.replace(`  definition: "one thing",\n`, "")
  )
})

test("a property its page type requires is refused rather than taken away", () => {
  expect(whyOf("slug", "held", FILES)).toBe("`slug` is required, so taking `held` away is a retype")
})

test("a value the property does not hold is refused", () => {
  expect(whyOf("partSlugs", "delta", FILES)).toBe("`partSlugs` holds no `delta`")
  expect(whyOf("definition", "another", FILES)).toBe("`definition` holds no `another`")
})

test("a property holding no text at all is refused", () => {
  expect(whyOf("onCall", "true", FILES)).toBe("`onCall` holds no `true`")
})

test("a key the body states nothing under is refused", () => {
  expect(whyOf("cover", "x", FILES)).toBe(`\`${PAGE}\` states no \`cover\``)
})

test("a body that could not be read is refused", () => {
  expect(whyOf("partSlugs", "beta", {})).toBe(`\`${PAGE}\` could not be read`)
})

test("a page type the index answers nothing for refuses rather than taking the property away", () => {
  expect(whyOf("definition", "one thing", FILES, null)).toBe(
    "whether `definition` is required could not be read"
  )
})

test("the body is answered under the path it was worked out from", () => {
  const said = saidOf("partSlugs", "beta", FILES)
  expect(pathsIn(said)).toEqual([PAGE])
})

test("the body is answered rather than written", () => {
  expect(saidOf("partSlugs", "beta", FILES).refused).toBe(null)
  expect(FILES[PAGE]).toBe(BODY)
})
