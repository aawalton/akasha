import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { knownOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { addPropertyValue, runChange } from "./add-property-value.change-checked.code.ts"

const AT = "held/held.domain.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const PAGE = { id: ID, pageTypeSlug: "domain", slug: "held" } as Value

const RUNS = "change-mechanical/add-property-value"

type Told = {
  readonly slug: string | null
  readonly target: string | null
  readonly found: readonly { readonly path: string; readonly id: string }[]
  readonly page?: Value | null
}

function worldTold(told: Told): World {
  const known = knownOf({
    slugOfKeyIn: () => told.slug,
    targetOf: () => told.target,
    admitting: (one) => [one],
    at: () => told.found,
  })
  return {
    root: "/nowhere",
    index: { knownIn: () => known, pageAt: () => ("page" in told ? told.page : PAGE) } as never,
    textOf: () => null,
    over: NOTHING_OVER,
  }
}

const ASKED = { at: AT, key: "partSlugs", value: "command/two" }

const REACHED = [{ path: "two.command.ts", id: ID }]

test("a value naming no page is refused where the key names a relation", async () => {
  const world = worldTold({ slug: "part-slugs", target: "command", found: [] })

  const said = await addPropertyValue(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    "`partSlugs` names a relation, and no `command` carries the slug `two`"
  )
})

test("a value reaching a page is handed to the mechanical change of the same name", async () => {
  let reached = ""
  const world = worldTold({ slug: "part-slugs", target: "command", found: REACHED })

  const said = await addPropertyValue(
    {
      ...world,
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

test("a key naming no relation is handed on with no page reached", async () => {
  let reached = ""
  const world = worldTold({ slug: null, target: null, found: [] })

  await addPropertyValue(
    {
      ...world,
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    ASKED
  )

  expect(reached).toBe(RUNS)
})

test("a path the world names no page at is refused", async () => {
  const world = worldTold({ slug: "part-slugs", target: "command", found: [], page: null })

  const said = await addPropertyValue(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold({ slug: null, target: null, found: [] }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`key` names what this change is handed/)
})
