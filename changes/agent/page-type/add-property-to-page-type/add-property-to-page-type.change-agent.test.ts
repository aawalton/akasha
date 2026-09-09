import { expect, test } from "bun:test"
import { stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Reaching, World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
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

const MEMBER = "change-mechanical-file-content/add-type-member"

const OUTSIDE_AT = "elsewhere/web-directory.build-folder-property.ts"

const MANIFEST_AT = "elsewhere/package.json"

const NAMED = "@probe/elsewhere/web-directory"

const MANIFEST = JSON.stringify({
  name: "@probe/elsewhere",
  exports: { "./web-directory": "./web-directory.build-folder-property.ts" },
})

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

type Holding = {
  readonly path?: string
  readonly listed?: boolean
  readonly owner?: boolean
  readonly named?: boolean
}

function catching(seen: Reached[]): Reaching {
  return (_world, at, given) => {
    seen.push({ at, given: given as Record<string, unknown> })
    return Promise.resolve(stating([]))
  }
}

function worldFor(seen: Reached[], holding: Holding = {}): World {
  const path = holding.path ?? PROPERTY_AT
  const held: Readonly<Record<string, string>> =
    holding.named === false ? {} : { [MANIFEST_AT]: MANIFEST }
  return {
    ...worldOf(held),
    index: {
      listedAt: () => (holding.listed === false ? [] : [{ path, id: path }]),
      pageByPath: (one: string) => {
        if (one === OWNER_AT) return holding.owner === false ? null : { slug: "ios-app" }
        return { propertySlug: "web-directory" }
      },
      everyPath: () => Object.keys(held),
      fileKeysAt: () => new Map([["manifest", "package.json"]]),
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

test("the key the member carries is the key the property answers to", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[2]?.at).toBe(MEMBER)
  expect(seen[2]?.given.key).toBe("webDirectory")
})

test("the type the member names is the type the property's page exports", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[2]?.given.held).toBe("WebDirectory")
  expect(seen[2]?.given.type).toBe("IosApp")
  expect(seen[2]?.given.from).toBe("./properties/web-directory.build-folder-property.ts")
})

test("a member is written optional where the declaration is not required", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[2]?.given.optional).toBe(true)
})

test("a member is written required where the declaration is required", async () => {
  const seen: Reached[] = []
  await answering(seen, { required: true })
  expect(seen[2]?.given.optional).toBe(false)
})

test("a property sitting outside that folder is reached by the name a package gives it", async () => {
  const seen: Reached[] = []

  const said = await answering(seen, {}, { path: OUTSIDE_AT })

  expect(said.refused).toBe(null)
  expect(seen[2]?.given.from).toBe(NAMED)
})

test("a property outside that folder no package names is refused", async () => {
  const seen: Reached[] = []

  const said = await answering(seen, {}, { path: OUTSIDE_AT, named: false })

  expect(said.refused).toContain("no package names it")
  expect(seen).toHaveLength(0)
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
