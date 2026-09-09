import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { knownOf } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { removePropertyValue, runChange } from "./remove-property-value.change-agent.code.ts"

const AT = "held/held.domain.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const PAGE = { id: ID, pageTypeSlug: "domain", slug: "held" } as Value

const RUNS = "change-mechanical-file-content/remove-property-value"

function worldWith(page: Value | null): World {
  const known = knownOf({})
  return {
    root: "/nowhere",
    index: { knownIn: () => known, pageByPath: () => page } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const ASKED = { at: AT, key: "partSlugs", value: "command/one" }

test("the value is handed to the mechanical change of the same name", async () => {
  let reached = ""

  const said = await removePropertyValue(
    {
      ...worldWith(PAGE),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    ASKED
  )

  expect(reached).toBe(RUNS)
  expect(said.refused).toBeNull()
})

test("a value naming no page is handed on as any other value is", async () => {
  let reached = ""

  await removePropertyValue(
    {
      ...worldWith(PAGE),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { ...ASKED, value: "command/nowhere" }
  )

  expect(reached).toBe(RUNS)
})

test("a path the world names no page at is refused", async () => {
  const said = await removePropertyValue(worldWith(null), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldWith(PAGE), { at: AT, key: "partSlugs" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`value` names what this change is handed/)
})
