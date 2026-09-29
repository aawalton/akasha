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
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const AT = "agent/seat/pages/held.seat.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const BODY = `import type { Seat } from "../seat.page-type.ts"

export const held = {
  id: "${ID}",
  type: "page-type/seat",
  slug: "held",
  assignmentSlug: "workspace-package/agent",
} as const satisfies Seat
`

const PAGE = { id: ID, type: `${pageType.slug}/seat`, slug: "held" } as Value

const METRIC_BODY = `import type { Metric } from "../metric.page-type.ts"

export const held = {
  id: "${ID}",
  type: "page-type/seat",
  slug: "held",
  value: 10,
  shown: true,
} as const satisfies Metric
`

const CARRIED = [
  { key: "value", pageTypeSlug: "number-property" },
  { key: "shown", pageTypeSlug: "boolean-property" },
  { key: "endsAt", pageTypeSlug: "instant-property" },
  { key: "count", pageTypeSlug: "number-property" },
  { key: "beats", pageTypeSlug: "text-property", many: true },
  { key: "characters", pageTypeSlug: "multi-relation-property", many: true },
]

const SIBLING = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b05a",
  slug: "other",
  endsAt: "2026-09-28T10:00:00.000Z",
  value: 3,
  shown: false,
  count: 2,
} as Value

function worldTold(slug: string | null, target: string | null, body = BODY): World {
  const known = knownOf({
    slugOfKeyIn: () => slug,
    targetOf: () => target,
    admitting: (one) => [one],
  })
  const index = {
    knownIn: () => known,
    pageByPath: () => (body === BODY ? PAGE : { ...PAGE, value: 10, shown: true }),
    propertiesIfNamed: () => (body === BODY ? null : CARRIED),
    kindsUnder: (kind: string) => new Set([kind]),
    valuesByPath: () => new Map([["other", SIBLING]]),
  }
  return {
    root: "/nowhere",
    index: index as never,
    textOf: () => body,
    bodyOf: () => body,
    under: () => [],
    base: () => body,
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

test("a key the page type declares a number is stated anew as a number", async () => {
  const world = worldTold("value", null, METRIC_BODY)

  const said = await changePageProperty(world, { at: AT, key: "value", to: "8" })

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => METRIC_BODY)).toBe(METRIC_BODY.replace("value: 10", "value: 8"))
})

test("a key the page type declares a boolean is stated anew as a boolean", async () => {
  const world = worldTold("shown", null, METRIC_BODY)

  const said = await changePageProperty(world, { at: AT, key: "shown", to: "false" })

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => METRIC_BODY)).toContain("shown: false,")
})

test("a value that is no number is refused for a key declared a number", async () => {
  const world = worldTold("value", null, METRIC_BODY)

  const said = await changePageProperty(world, { at: AT, key: "value", to: "ten" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`ten` is no number, so nothing is restated")
})

test("a key the page type declares and the page states not yet is added where its siblings put it", async () => {
  const world = worldTold(null, null, METRIC_BODY)

  const said = await changePageProperty(world, {
    at: AT,
    key: "endsAt",
    to: "2026-09-28T11:27:00.000Z",
  })

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => METRIC_BODY)).toBe(
    METRIC_BODY.replace(
      `  slug: "held",\n`,
      `  slug: "held",\n  endsAt: "2026-09-28T11:27:00.000Z",\n`
    )
  )
})

test("a number key the page states not yet is added as a number", async () => {
  const world = worldTold(null, null, METRIC_BODY)

  const said = await changePageProperty(world, { at: AT, key: "count", to: "4" })

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => METRIC_BODY)).toContain("  shown: true,\n  count: 4,\n}")
})

test("a key the page type does not declare is refused rather than added", async () => {
  const world = worldTold(null, null, METRIC_BODY)

  const said = await changePageProperty(world, { at: AT, key: "nowhere", to: "x" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`nowhere` is no property `seat` declares, so nothing is stated")
})

test("a key with many values is refused with the line `add-property-values` takes for it", async () => {
  const many = BODY.replace(
    `  assignmentSlug:`,
    `  characters: ["character/one"],\n  assignmentSlug:`
  )
  const world = worldTold(null, null, many)

  const said = await changePageProperty(world, { at: AT, key: "characters", to: "character/two" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toStartWith("`characters` holds many values, so nothing is stated.")
  expect(said.refused ?? "").toContain(
    `\`add-property-values\`, handing it \`added: ${AT} characters <value>\``
  )
  expect(said.refused ?? "").toContain("`remove-property-value`")
  expect(said.refused ?? "").toContain("`place` beside `at`, `key` and `to`")
})

test("a many-valued key the page states not yet is refused rather than added as one value", async () => {
  const world = worldTold(null, null, METRIC_BODY)

  const said = await changePageProperty(world, { at: AT, key: "characters", to: "character/two" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(`\`added: ${AT} characters <value>\``)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold("slug", null), { key: "slug" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at` names what this change is handed/)
})

const MANY = BODY.replace(
  `  assignmentSlug:`,
  `  beats: ["Mara opens the gate", "The hall is dark"],\n  assignmentSlug:`
)

const LISTS = BODY.replace(
  `  assignmentSlug:`,
  `  characters: ["character/one"],\n  assignmentSlug:`
)

test("a place beside the key states the value at that place", async () => {
  const world = worldTold(null, null, MANY)

  const said = await changePageProperty(world, {
    at: AT,
    key: "beats",
    to: "The hall is lit",
    place: "2",
  })

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => MANY)).toContain(`beats: ["Mara opens the gate", "The hall is lit"]`)
})

test("a place that is no whole number is refused", async () => {
  const world = worldTold(null, null, MANY)

  const said = await runChange(world, { at: AT, key: "beats", to: "x", place: "last" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/is no whole number/)
})

test("a place on a key holding one value is refused", async () => {
  const said = await changePageProperty(worldTold("slug", null), {
    at: AT,
    key: "slug",
    to: "other",
    place: "1",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds one value, so no place names it/)
})

test("a place on a key naming a relation is refused", async () => {
  const said = await changePageProperty(worldTold("characters", "character", LISTS), {
    at: AT,
    key: "characters",
    to: "character/two",
    place: "1",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`characters` names a relation, and `place` names a place in a list of text"
  )
})

test("the place is handed to the change reached as a whole number", async () => {
  const caught: { given: unknown } = { given: null }
  const seeing: World = {
    ...worldTold(null, null, MANY),
    reaching: (_world, _at, given) => {
      caught.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await changePageProperty(seeing, { at: AT, key: "beats", to: "The hall is lit", place: "2" })

  expect(caught.given).toEqual({ at: AT, key: "beats", to: "The hall is lit", place: 2 })
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
