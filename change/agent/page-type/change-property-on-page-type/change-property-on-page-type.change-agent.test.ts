import { expect, test } from "bun:test"
import {
  changePropertyOnPageType,
  runChange,
} from "akasha/change/agent/page-type/change-property-on-page-type/change-property-on-page-type.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  type Caught,
  catching,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const ASKED = "the world was asked"

const RUNG = "change-mechanical-page-type/change-property-on-page-type"

const A_TYPE = "alan/kept/kept-thing.page-type.ts"

const NO_TYPE = "alan/kept/one.kept-thing.ts"

const NO_PAGE = "alan/kept/notes.md"

const PROPERTY = "text-property/kept-mark"

const SAID = JSON.stringify("beta")

const UNASKED: World = {
  root: "/nowhere",
  index: new Proxy(
    {},
    {
      get() {
        throw new Error(ASKED)
      },
    }
  ) as never,
  textOf: () => {
    throw new Error(ASKED)
  },
  bodyOf: () => {
    throw new Error(ASKED)
  },
  under: () => [],
  base: () => {
    throw new Error(ASKED)
  },
  over: NOTHING_OVER,
}

test("a page that is no page type is refused here", async () => {
  const said = await changePropertyOnPageType(UNASKED, {
    at: NO_TYPE,
    property: PROPERTY,
    required: true,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("no page type")
})

test("a path reading as no page file is refused", async () => {
  const said = await changePropertyOnPageType(UNASKED, {
    at: NO_PAGE,
    property: PROPERTY,
    required: true,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("no page file")
})

test("the one address this change reaches is the rung stating a declaration anew", async () => {
  const seen: string[] = []

  const said = await changePropertyOnPageType(
    { ...UNASKED, reaching: listing(seen) },
    { at: A_TYPE, property: PROPERTY, required: true, many: false }
  )

  expect(seen).toEqual([RUNG])
  expect(said.refused).toBeNull()
})

test("a count and a default the change was handed are handed on to that rung", async () => {
  const seen: Caught[] = []

  await runChange(
    { ...UNASKED, reaching: catching(seen) },
    {
      at: A_TYPE,
      property: PROPERTY,
      required: "true",
      many: "true",
      "max-count": "3",
      default: SAID,
    }
  )

  expect(seen[0]?.given).toEqual({
    at: A_TYPE,
    property: PROPERTY,
    required: true,
    many: true,
    maxCount: "3",
    default: SAID,
  })
})

test("a count and a default the caller states nowhere are left out", async () => {
  const seen: Caught[] = []

  await runChange(
    { ...UNASKED, reaching: catching(seen) },
    { at: A_TYPE, property: PROPERTY, required: "false", many: "false" }
  )

  expect(seen[0]?.given).toEqual({
    at: A_TYPE,
    property: PROPERTY,
    required: false,
    many: false,
  })
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const neither = await runChange(UNASKED, {})
  const noMany = await runChange(UNASKED, { at: A_TYPE, property: PROPERTY, required: "true" })

  expect(neither.refused ?? "").toContain("`at`")
  expect(noMany.refused ?? "").toContain("`many`")
})
