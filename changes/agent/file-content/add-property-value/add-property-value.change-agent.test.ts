import { expect, test } from "bun:test"
import type { Shaped } from "@akasha/indexes/reaching"
import type { Value } from "@akasha/pages/page-value"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { addPropertyValue, runChange } from "./add-property-value.change-agent.code.ts"

const AT = "held/held.domain.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const PAGE = { id: ID, pageTypeSlug: "domain", slug: "held" } as Value

const RUNS = "change-mechanical-file-content/add-property-value"

type Told = {
  readonly slug: string | null
  readonly target: string | null
  readonly found: readonly { readonly path: string; readonly id: string }[]
  readonly page?: Value | null
  readonly carried?: readonly { readonly key: string; readonly many: boolean }[]
}

function worldTold(told: Told): World {
  const known: Shaped = {
    targetOf: () => told.target,
    admitting: (one: string) => [one],
    mortal: () => false,
    scoping: () => null,
    filed: () => told.found,
    fieldsOf: () => [],
    slugOfKeyIn: () => told.slug,
    fieldOfKey: () => null,
  }
  return {
    root: "/nowhere",
    index: {
      knownIn: () => known,
      pageByPath: () => ("page" in told ? told.page : PAGE),
      propertiesIfNamed: () => told.carried ?? [],
    } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
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

test("`after` is handed on where the caller states `after`", async () => {
  let handed: unknown = null
  const world = worldTold({ slug: null, target: null, found: [] })

  await runChange(
    {
      ...world,
      reaching: (_world, _at, given) => {
        handed = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { ...ASKED, after: "slug" }
  )

  expect(handed).toEqual({ ...ASKED, after: "slug" })
})

test("`after` is left out where no `after` is stated", async () => {
  let handed: unknown = null
  const world = worldTold({ slug: null, target: null, found: [] })

  await runChange(
    {
      ...world,
      reaching: (_world, _at, given) => {
        handed = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    ASKED
  )

  expect(handed).toEqual(ASKED)
  expect("after" in (handed as object)).toBe(false)
})

test("a key the page type declares as carrying one value is handed on as single", async () => {
  let handed: unknown = null
  const world = worldTold({
    slug: null,
    target: null,
    found: [],
    carried: [{ key: "manifest", many: false }],
  })

  await runChange(
    {
      ...world,
      reaching: (_world, _at, given) => {
        handed = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, key: "manifest", value: "json" }
  )

  expect(handed).toEqual({ at: AT, key: "manifest", value: "json", single: true })
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold({ slug: null, target: null, found: [] }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`key` names what this change is handed/)
})
