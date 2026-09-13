import { expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file-content/change/change-page-page-type/change-page-page-type.change-mechanical-file-content.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const AT = "one/kept.one-thing.ts"

const TO = "two/two-thing.page-type.ts"

const IMPORTED = `import type { OneThing } from "../one-thing.page-type.ts"`

const BODY = `${IMPORTED}

export const kept = {
  pageTypeSlug: "one-thing",
  slug: "kept",
} as const satisfies OneThing
`

type Passage = { readonly at: string; readonly old: string; readonly new: string }

function worldHolding(text: string | null): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => text,
    bodyOf: (at) => (at.endsWith(".types.ts") ? null : ""),
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

function passagesOf(said: Answer): readonly Passage[] {
  return said.edits.flatMap((one) =>
    one.kind === "replace" ? [{ at: one.path, old: one.contentFrom, new: one.contentTo }] : []
  )
}

test("each passage is answered as a replace rather than reached for", () => {
  const said = runChange(worldHolding(BODY), { at: AT, to: TO })
  const passages = passagesOf(said)

  expect(said.refused).toBe(null)
  expect(passages).toHaveLength(3)
  expect(passages[1]).toEqual({ at: AT, old: "satisfies OneThing", new: "satisfies TwoThing" })
  expect(passages[2]).toEqual({
    at: AT,
    old: `pageTypeSlug: "one-thing"`,
    new: `pageTypeSlug: "two-thing"`,
  })
})

test("a body stating the page type under two keys has both restated", () => {
  const body = `${IMPORTED}

export const kept = {
  pageTypeSlug: "one-thing",
  type: "one-thing",
  slug: "kept",
} as const satisfies OneThing
`

  const said = runChange(worldHolding(body), { at: AT, to: TO })

  expect(said.refused).toBe(null)
  expect(passagesOf(said)).toEqual([
    {
      at: AT,
      old: IMPORTED,
      new: `import type { TwoThing } from "akasha/two/two-thing.page-type.ts"`,
    },
    { at: AT, old: "satisfies OneThing", new: "satisfies TwoThing" },
    { at: AT, old: `pageTypeSlug: "one-thing"`, new: `pageTypeSlug: "two-thing"` },
    { at: AT, old: `type: "one-thing"`, new: `type: "two-thing"` },
  ])
})

test("the import naming that type is restated to reach the page type named", () => {
  const said = runChange(worldHolding(BODY), { at: AT, to: TO })

  expect(passagesOf(said)[0]).toEqual({
    at: AT,
    old: IMPORTED,
    new: `import type { TwoThing } from "akasha/two/two-thing.page-type.ts"`,
  })
})

test("the import reaches the type file beside the page type where that page type has one", () => {
  const world: World = { ...worldHolding(BODY), bodyOf: () => "" }

  const said = runChange(world, { at: AT, to: TO })

  expect(passagesOf(said)[0]).toEqual({
    at: AT,
    old: IMPORTED,
    new: `import type { TwoThing } from "akasha/two/two-thing.page-type.types.ts"`,
  })
})

test("a body stating no page type is refused", () => {
  const said = runChange(worldHolding("export const kept = {}\n"), { at: AT, to: TO })

  expect(said.refused).toBe(`\`${AT}\` states no \`type\`, so no page type is restated`)
})

test("a body stating the page type named already is refused", () => {
  const said = runChange(worldHolding(BODY), { at: AT, to: "two/one-thing.page-type.ts" })

  expect(said.refused).toBe("`one-thing` is the page type the body states already")
})

test("a body importing no type named for the page type that body states is refused", () => {
  const said = runChange(worldHolding(BODY.slice(IMPORTED.length)), { at: AT, to: TO })

  expect(said.refused).toBe(
    `\`${AT}\` imports no type named \`OneThing\`, so no page type is restated`
  )
})

test("a path holding no body is refused", () => {
  const said = runChange(worldHolding(null), { at: AT, to: TO })

  expect(said.refused).toBe(`\`${AT}\` holds no body, so no page type is restated`)
})
