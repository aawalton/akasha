import { expect, test } from "bun:test"
import type { Shaped } from "@akasha/indexes/reaching"
import type { Value } from "@akasha/pages/page-value"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { changePageProperty, runChange } from "./change-page-property.change-checked.code.ts"

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

function worldTold(slug: string | null, target: string | null): World {
  const known = {
    slugOfKeyIn: () => slug,
    targetOf: () => target,
    admitting: (one: string) => [one],
    at: () => [],
    byId: () => null,
    mortal: () => false,
  } as unknown as Shaped
  return {
    root: "/nowhere",
    index: { knownIn: () => known, pageAt: () => PAGE } as never,
    textOf: () => BODY,
    over: NOTHING_OVER,
  }
}

test("a key naming a relation is handed to the change for a relation", () => {
  const world = worldTold("assignment-slug", "initiative")

  const said = changePageProperty(world, {
    at: AT,
    key: "assignmentSlug",
    to: "initiative/nope",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names a relation, and/)
})

test("a key naming no relation is stated anew with no page reached", () => {
  const world = worldTold("slug", null)

  const said = changePageProperty(world, { at: AT, key: "slug", to: "other" })

  expect(said.refused).toBeNull()
  expect(said.edits[0]?.body ?? "").toContain(`slug: "other"`)
})

test("an argument this change was handed no value for is refused by the key", () => {
  const said = runChange(worldTold("slug", null), { key: "slug" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at` names what this change is handed/)
})
