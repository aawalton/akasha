import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { runChange as changeValue } from "../../../mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.code.ts"
import { runChange as changeRelation } from "../../../mechanical/file-content/change/change-page-page-property-relation/change-page-page-property-relation.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  bodyOf,
  knownOf,
} from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { changePageProperty, runChange } from "./change-page-page-property.change-agent.code.ts"

const RUNS: Reaching = async (world, at, given) => {
  if (at === "change-mechanical-file-content/change-page-page-property") {
    return await Promise.resolve(changeValue(world, given as Parameters<typeof changeValue>[1]))
  }
  if (at === "change-mechanical-file-content/change-page-page-property-relation") {
    return await changeRelation(world, given as Parameters<typeof changeRelation>[1])
  }
  return refusing(`\`${at}\` is reached by nothing here`)
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

function worldTold(slug: string | null, target: string | null): World {
  const known = knownOf({
    slugOfKeyIn: () => slug,
    targetOf: () => target,
    admitting: (one) => [one],
  })
  return {
    root: "/nowhere",
    index: { knownIn: () => known, pageByPath: () => PAGE } as never,
    textOf: () => BODY,
    bodyOf: () => BODY,
    under: () => [],
    base: () => BODY,
    over: NOTHING_OVER,
    reaching: RUNS,
  }
}

test("a key naming a relation is handed to the change for a relation", async () => {
  const world = worldTold("assignment-slug", "initiative")

  const said = await changePageProperty(world, {
    at: AT,
    key: "assignmentSlug",
    to: "initiative/nope",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names a relation, and/)
})

test("a key naming no relation is stated anew with no page reached", async () => {
  const world = worldTold("slug", null)

  const said = await changePageProperty(world, { at: AT, key: "slug", to: "other" })

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => BODY)).toContain(`slug: "other"`)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold("slug", null), { key: "slug" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at` names what this change is handed/)
})

test("each key is handed to the change reached at the address that key names", async () => {
  const reached: string[] = []
  const seeing = (slug: string, target: string | null): World => ({
    ...worldTold(slug, target),
    reaching: (_world, at) => {
      reached.push(at)
      return Promise.resolve(NOTHING_OVER)
    },
  })

  await changePageProperty(seeing("assignment-slug", "initiative"), {
    at: AT,
    key: "assignmentSlug",
    to: "initiative/found",
  })
  await changePageProperty(seeing("slug", null), { at: AT, key: "slug", to: "other" })

  expect(reached).toEqual([
    "change-mechanical-file-content/change-page-page-property-relation",
    "change-mechanical-file-content/change-page-page-property",
  ])
})
