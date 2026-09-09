import { expect, test } from "bun:test"
import { refusing, stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Reaching, World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import {
  removePropertyFromPageType,
  runChange,
} from "./remove-property-from-page-type.change-agent.code.ts"

const OWNER_AT = "held/ios-apps/ios-app.page-type.ts"

const PROPERTY_AT = "held/ios-apps/properties/web-directory.build-folder-property.ts"

const PROPERTY = "build-folder-property/web-directory"

const MEMBER = "change-mechanical-file-content/remove-type-member"

const VALUE = "change-mechanical-file-content/remove-property-value"

const RECORD = "change-mechanical-file-content/remove-property-record"

const SAID_NO = "that change said no"

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

type Holding = {
  readonly path?: string
  readonly listed?: boolean
  readonly owner?: boolean
  readonly parted?: boolean
  readonly refuses?: boolean
}

function catching(seen: Reached[], refuses: boolean): Reaching {
  return (_world, at, given) => {
    seen.push({ at, given: given as Record<string, unknown> })
    return Promise.resolve(refuses ? refusing(SAID_NO) : stating([]))
  }
}

function worldFor(seen: Reached[], holding: Holding = {}): World {
  const path = holding.path ?? PROPERTY_AT
  return {
    ...worldOf({}),
    index: {
      listedAt: () => (holding.listed === false ? [] : [{ path, id: path }]),
      pageByPath: (one: string) => {
        if (one !== OWNER_AT) return { propertySlug: "web-directory" }
        if (holding.owner === false) return null
        if (holding.parted === false) return { slug: "ios-app" }
        return { slug: "ios-app", parts: [PROPERTY] }
      },
    } as never,
    reaching: catching(seen, holding.refuses === true),
  }
}

async function answering(
  seen: Reached[],
  given: Partial<Parameters<typeof removePropertyFromPageType>[1]> = {},
  holding: Holding = {}
) {
  return await removePropertyFromPageType(worldFor(seen, holding), {
    at: OWNER_AT,
    property: PROPERTY,
    ...given,
  })
}

test("the member taken out is the one keyed by the key the property answers to", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[0]?.at).toBe(MEMBER)
  expect(seen[0]?.given.key).toBe("webDirectory")
})

test("the object type worked is the one the page type's slug names", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[0]?.given.type).toBe("IosApp")
  expect(seen[0]?.given.at).toBe(OWNER_AT)
})

test("the property goes from among the page type's parts in the same answer", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[1]?.at).toBe(VALUE)
  expect(seen[1]?.given.key).toBe("parts")
  expect(seen[1]?.given.value).toBe(PROPERTY)
})

test("a page type that declares a property without parting it loses the declaration alone", async () => {
  const seen: Reached[] = []
  const said = await answering(seen, {}, { parted: false })
  expect(said.refused).toBe(null)
  expect(seen.map((one) => one.at)).toEqual([MEMBER, RECORD])
  expect(seen[1]?.given.key).toBe("properties")
  expect(seen[1]?.given.is).toBe(PROPERTY)
})

test("the declaration taken out is the one naming that property", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen[2]?.at).toBe(RECORD)
  expect(seen[2]?.given.key).toBe("properties")
  expect(seen[2]?.given.where).toBe("pageProperty")
  expect(seen[2]?.given.is).toBe(PROPERTY)
})

test("the member goes first, then the part, then the declaration", async () => {
  const seen: Reached[] = []
  await answering(seen)
  expect(seen.map((one) => one.at)).toEqual([MEMBER, VALUE, RECORD])
})

test("a refusal from a change this reaches is the refusal this gives", async () => {
  const seen: Reached[] = []
  const said = await answering(seen, {}, { refuses: true })
  expect(said.refused).toBe(SAID_NO)
  expect(seen).toHaveLength(1)
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
  expect(seen).toHaveLength(0)
})

test("a path naming no page type is refused before any body is worked out", async () => {
  const seen: Reached[] = []
  const said = await answering(seen, {}, { owner: false })
  expect(said.refused).toContain("names no page type")
  expect(seen).toHaveLength(0)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldFor([]), { at: OWNER_AT })
  expect(said.refused).toContain("property")
})
