import { expect, test } from "bun:test"
import { akasha } from "akasha/akasha.domain.ts"
import {
  changePagePropertyText,
  runChange,
} from "akasha/change/agent/file-content/change-page-page-property-text/change-page-page-property-text.change-agent.code.ts"
import {
  bodiesIn,
  NOTHING_OVER,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const AT = "agent/seat/pages/held.seat.ts"

const TEXT_PROPERTY = "text-property"

const PROSE = "standard-agent-english-property"

const AKASHA_DOMAIN = `${domain.slug}/${akasha.slug}` as const

const ID = "01a07995-6678-7cad-9f52-e0a331e96bde"

const BODY = `import type { Seat } from "../seat.page-type.ts"

export const held = {
  id: "${ID}",
  pageTypeSlug: "seat",
  slug: "held",
  startMode: "interactive",
  assignmentSlug: "workspace-package/agent",
} as const satisfies Seat
`

const PAGE = { id: ID, pageTypeSlug: "seat", slug: "held" } as Value

function carrying(key: string, pageTypeSlug: string): Carried {
  return {
    pagePropertySlug: key,
    pageTypeSlug,
    propertySlug: key,
    key,
    unique: null,
    declaredBy: "seat",
    required: false,
    many: false,
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
  }
}

function worldTold(carried: readonly Carried[], value: Value | null): World {
  return {
    root: "/nowhere",
    index: {
      knownIn: () => ({}),
      pageByPath: () => value,
      propertiesIfNamed: () => carried,
      kindsUnder: () => new Set([TEXT_PROPERTY, PROSE]),
    } as never,
    textOf: () => BODY,
    bodyOf: () => BODY,
    under: () => [],
    base: () => BODY,
    over: NOTHING_OVER,
    reaching: running,
  }
}

test("a text property is stated anew in other words", async () => {
  const world = worldTold([carrying("startMode", "text-property")], PAGE)

  const said = await changePagePropertyText(world, { at: AT, key: "startMode", to: "headless" })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(AT) ?? "").toContain(`startMode: "headless"`)
})

test("a property whose page type extends a text property is stated anew too", async () => {
  const world = worldTold([carrying("startMode", PROSE)], PAGE)

  const said = await changePagePropertyText(world, { at: AT, key: "startMode", to: "headless" })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(AT) ?? "").toContain(`startMode: "headless"`)
})

test("a key naming no text property is refused by the kind of property named", async () => {
  const world = worldTold([carrying("assignmentSlug", "one-of-property")], PAGE)

  const said = await changePagePropertyText(world, {
    at: AT,
    key: "assignmentSlug",
    to: AKASHA_DOMAIN,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names a `one-of-property`/)
})

test("a path the world names no page at is refused", async () => {
  const world = worldTold([carrying("startMode", "text-property")], null)

  const said = await changePagePropertyText(world, { at: AT, key: "startMode", to: "headless" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})

test("a key the page's own page type carries no property for is refused", async () => {
  const world = worldTold([], PAGE)

  const said = await changePagePropertyText(world, { at: AT, key: "startMode", to: "headless" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/carries no property under `startMode`/)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const world = worldTold([carrying("startMode", "text-property")], PAGE)

  const said = await runChange(world, { key: "startMode" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at` names what this change is handed/)
})
