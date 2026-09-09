import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  bodyOf,
  knownOf,
} from "../../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { runChange as changePageProperty } from "../change-page-page-property/change-page-page-property.change-mechanical-file-content.code.ts"
import { changePagePropertyRelation } from "./change-page-page-property-relation.change-mechanical-file-content.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/change-page-page-property") {
    const said = changePageProperty(world, given as Parameters<typeof changePageProperty>[1])
    return Promise.resolve(said)
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const AT = "seat-system/seats/pages/held.seat.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const BODY = `import type { Seat } from "../seat.page-type.ts"

export const held = {
  id: "${ID}",
  pageTypeSlug: "seat",
  slug: "held",
  assignmentSlug: "workspace-package/agent",
} as const satisfies Seat
`

const PAGE = { id: ID, pageTypeSlug: "seat", slug: "held" } as Value

type Told = {
  readonly slug: string | null
  readonly target: string | readonly string[] | null
  readonly found: readonly { readonly path: string; readonly id: string }[]
  readonly page?: Value | null
}

function worldTold(told: Told): World {
  const known = knownOf({
    slugOfKeyIn: () => told.slug,
    targetOf: () => told.target,
    admitting: (one) => [one],
    filed: () => told.found,
  })
  return {
    root: "/nowhere",
    index: {
      knownIn: () => known,
      pageByPath: () => ("page" in told ? told.page : PAGE),
    } as never,
    textOf: () => BODY,
    bodyOf: () => BODY,
    under: () => [],
    base: () => BODY,
    over: NOTHING_OVER,
    reaching: RUNS,
  }
}

const ASKED = { at: AT, key: "assignmentSlug", to: "initiative/found" }

test("a key naming no relation is refused", async () => {
  const world = worldTold({ slug: "purpose", target: null, found: [] })

  const said = await changePagePropertyRelation(world, { ...ASKED, key: "purpose" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no relation/)
})

test("a value naming no page is refused in the words the checks use", async () => {
  const world = worldTold({ slug: "assignment-slug", target: "initiative", found: [] })

  const said = await changePagePropertyRelation(world, { ...ASKED, to: "initiative/nope" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    "`assignmentSlug` names a relation, and no `initiative` carries the slug `nope`"
  )
})

test("a value reaching a page is handed to the change stating one key anew", async () => {
  const world = worldTold({
    slug: "assignment-slug",
    target: "initiative",
    found: [{ path: "one.initiative.ts", id: ID }],
  })

  const said = await changePagePropertyRelation(world, ASKED)

  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(1)
  expect(bodyOf(said, () => BODY)).toContain(`assignmentSlug: "initiative/found"`)
})

test("a path the world names no page at is refused", async () => {
  const world = worldTold({ slug: "assignment-slug", target: "initiative", found: [], page: null })

  const said = await changePagePropertyRelation(world, ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})
