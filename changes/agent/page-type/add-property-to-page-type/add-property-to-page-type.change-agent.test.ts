import { expect, test } from "bun:test"
import type { World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { catching, worldOf } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  addPropertyToPageType,
  recordFor,
  runChange,
} from "./add-property-to-page-type.change-agent.code.ts"

const OWNER_AT = "held/ios-apps/ios-app.page-type.ts"

const PROPERTY_AT = "held/ios-apps/properties/web-directory.build-folder-property.ts"

const PROPERTY = "build-folder-property/web-directory"

const RECORD = "change-mechanical-file-content/add-property-record"

const VALUE = "change-mechanical-file-content/add-property-value"

const OUTSIDE_AT = "elsewhere/web-directory.build-folder-property.ts"

const TYPES = "ts"

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

type Holding = {
  readonly path?: string
  readonly listed?: boolean
  readonly owner?: boolean
  readonly typed?: boolean
}

function worldFor(seen: Reached[], holding: Holding = {}): World {
  const path = holding.path ?? PROPERTY_AT
  return {
    ...worldOf({}),
    index: {
      listedAt: () => (holding.listed === false ? [] : [{ path, id: path }]),
      pageByPath: (one: string) => {
        if (one !== OWNER_AT) return null
        if (holding.owner === false) return null
        return holding.typed === true ? { slug: "ios-app", types: TYPES } : { slug: "ios-app" }
      },
    } as never,
    reaching: catching(seen),
  }
}

async function answering(
  seen: Reached[],
  given: Partial<Parameters<typeof addPropertyToPageType>[1]> = {},
  holding: Holding = {}
) {
  return await addPropertyToPageType(worldFor(seen, holding), {
    at: OWNER_AT,
    property: PROPERTY,
    required: false,
    many: false,
    ...given,
  })
}

test("the declaration is put in as a record rather than as the text of a record", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[0]?.at).toBe(RECORD)
  expect(seen[0]?.given.record).toBe(
    `{ pageProperty: "${PROPERTY}", required: false, many: false }`
  )
})

test("a declaration carrying one value states no count", () => {
  expect(
    recordFor({ at: OWNER_AT, property: PROPERTY, required: true, many: false })
  ).not.toContain("maxCount")
})

test("a declaration carrying many values states a count", () => {
  expect(
    recordFor({ at: OWNER_AT, property: PROPERTY, required: true, many: true, maxCount: "30" })
  ).toContain("maxCount: 30")
})

test("a count the change is not told is stated as nothing", () => {
  expect(recordFor({ at: OWNER_AT, property: PROPERTY, required: true, many: true })).toContain(
    "maxCount: null"
  )
})

test("the property is named among the page type's parts in the same answer", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[1]?.at).toBe(VALUE)
  expect(seen[1]?.given.key).toBe("parts")
  expect(seen[1]?.given.value).toBe(PROPERTY)
})

test("the declaration goes in first, then the part, and nothing else", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen.map((one) => one.at)).toEqual([RECORD, VALUE])
})

test("the type a page type has is left to the generator that writes it", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen.some((one) => one.at.endsWith("type-member"))).toBe(false)
})

test("a page type stating its type in a file of its own is no exception", async () => {
  const seen: Reached[] = []

  const said = await answering(seen, {}, { typed: true })

  expect(said.refused).toBe(null)
  expect(seen.map((one) => one.at)).toEqual([RECORD, VALUE])
})

test("a property sitting outside the page type's folder is declared the same way", async () => {
  const seen: Reached[] = []

  const said = await answering(seen, {}, { path: OUTSIDE_AT })

  expect(said.refused).toBe(null)
  expect(seen.map((one) => one.at)).toEqual([RECORD, VALUE])
})

test("a slug naming no page property is refused before any body is worked out", async () => {
  const seen: Reached[] = []
  const said = await answering(seen, {}, { listed: false })
  expect(said.refused).toContain("names no page property")
  expect(seen).toHaveLength(0)
})

test("a slug carrying no page type is refused", async () => {
  const seen: Reached[] = []
  const said = await answering(seen, { property: "web-directory" })
  expect(said.refused).toContain("names no page property")
})

test("a path naming no page type is refused before any body is worked out", async () => {
  const seen: Reached[] = []
  const said = await answering(seen, {}, { owner: false })
  expect(said.refused).toContain("names no page type")
  expect(seen).toHaveLength(0)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldFor([]), { at: OWNER_AT, property: PROPERTY })
  expect(said.refused).toContain("required")
})
