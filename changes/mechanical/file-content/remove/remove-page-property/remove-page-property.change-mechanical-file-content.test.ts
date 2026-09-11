import { expect, test } from "bun:test"
import { removePageProperty } from "akasha/changes/mechanical/file-content/remove/remove-page-property/remove-page-property.change-mechanical-file-content.code.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  bodyOf,
  declaring,
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

const ALONE = `import type { Held } from "./held.page-type.ts"

export const held = {
  definition: "one thing",
} as const satisfies Held
`

type Files = Readonly<Record<string, string>>

const FILES: Files = { [PAGE]: BODY }

function filesOf(bodies: Files): (path: string) => string | null {
  return (path) => bodies[path] ?? null
}

function saidOf(key: string, bodies: Files, carried: readonly Carried[] | null = DECLARED): Answer {
  return removePageProperty(worldKnowing(bodies, carried), { at: PAGE, key })
}

function bodyIn(key: string, bodies: Files): string {
  return bodyOf(saidOf(key, bodies), filesOf(bodies))
}

function whyOf(key: string, bodies: Files, carried: readonly Carried[] | null = DECLARED): string {
  const said = saidOf(key, bodies, carried)
  expect(said.edits).toEqual([])
  return said.refused ?? ""
}

test("a key holding many values goes with every value that key holds", () => {
  const body = bodyIn("partSlugs", FILES)

  expect(body).toBe(
    BODY.replace(`  partSlugs: [\n    "alpha",\n    "beta",\n    "gamma",\n  ],\n`, "")
  )
  expect(body).not.toContain("partSlugs")
  expect(body).not.toContain("beta")
})

test("a key holding one value goes with that value", () => {
  expect(bodyIn("definition", FILES)).toBe(BODY.replace(`  definition: "one thing",\n`, ""))
})

test("a key holding no text at all goes just the same", () => {
  expect(bodyIn("onCall", FILES)).toBe(BODY.replace(`  onCall: true,\n`, ""))
})

test("the one key a body states leaves an object holding nothing", () => {
  expect(bodyIn("definition", { [PAGE]: ALONE })).toContain(
    "export const held = {} as const satisfies Held"
  )
})

test("a key its page type requires is refused rather than taken away", () => {
  expect(whyOf("slug", FILES)).toBe("`slug` is required, so taking it away is a retype")
})

test("a key the body states nothing under answers no edit", () => {
  const said = saidOf("cover", FILES)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a key taken away twice answers no edit the second time", () => {
  const left = bodyIn("definition", FILES)

  const said = saidOf("definition", { [PAGE]: left })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a body exporting no object is refused rather than losing a key", () => {
  expect(whyOf("definition", { [PAGE]: "const held = 1\n" })).toBe(`\`${PAGE}\` exports no object`)
})

test("a body that could not be read is refused", () => {
  expect(whyOf("partSlugs", {})).toBe(`\`${PAGE}\` could not be read`)
})

test("a page type the index answers nothing for refuses rather than taking the key away", () => {
  expect(whyOf("definition", FILES, null)).toBe(
    "whether `definition` is required could not be read"
  )
})

test("the body is answered under the path it was worked out from", () => {
  expect(pathsIn(saidOf("partSlugs", FILES))).toEqual([PAGE])
})

test("the body is answered rather than written", () => {
  expect(saidOf("partSlugs", FILES).refused).toBe(null)
  expect(FILES[PAGE]).toBe(BODY)
})
