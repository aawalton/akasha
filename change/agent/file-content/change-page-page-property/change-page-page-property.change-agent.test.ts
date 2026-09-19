import { expect, test } from "bun:test"
import {
  changePageProperty,
  runChange,
} from "akasha/change/agent/file-content/change-page-page-property/change-page-page-property.change-agent.code.ts"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changePagePagePropertyRelation } from "akasha/change/mechanical/file-content/change/change-page-page-property-relation/change-page-page-property-relation.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyOf,
  knownOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT = "agent/seat/pages/held.seat.ts"

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
    reaching: running,
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
    `${changeMechanicalFileContent.slug}/${changePagePagePropertyRelation.slug}`,
    `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}`,
  ])
})
