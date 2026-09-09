import { expect, test } from "bun:test"
import type { Carried } from "@akasha/pages/page-type-properties"
import type { Value } from "@akasha/pages/page-value"
import { runChange as changeValue } from "../../../mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  changePagePropertyText,
  runChange,
} from "./change-page-page-property-text.change-agent.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/change-page-page-property") {
    return Promise.resolve(changeValue(world, given as Parameters<typeof changeValue>[1]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const AT = "seat-system/seats/pages/held.seat.ts"

const TEXT_PROPERTY = "text-property"

const PROSE = "standard-agent-english-property"

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
    reaching: RUNS,
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
    to: "domain/akasha",
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
