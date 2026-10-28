import { expect, test } from "bun:test"
import {
  relatedShown,
  relationSpecsOf,
} from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { asPageRow } from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"

const GREEN = [asPageRow({ id: "01a0c010-0000-7000-8000-000000000001", slug: "green" })]

const BLUE = [asPageRow({ id: "01a0c010-0000-7000-8000-000000000002", slug: "blue" })]

test("related pages never answered are still loading", () => {
  expect(relatedShown(null, false, null)).toBeNull()
})

test("related pages answered are the ones the store holds", () => {
  expect(relatedShown(null, true, GREEN)).toBe(GREEN)
})

test("related pages asked again keep the last ones shown until the new ones are answered", () => {
  expect(relatedShown(GREEN, false, null)).toBe(GREEN)
  expect(relatedShown(GREEN, false, BLUE)).toBe(GREEN)
})

test("related pages answered again replace the last ones shown", () => {
  expect(relatedShown(GREEN, true, BLUE)).toBe(BLUE)
})

test("related pages answered before the store has read them keep the last ones shown", () => {
  expect(relatedShown(GREEN, true, null)).toBe(GREEN)
  expect(relatedShown(null, true, null)).toEqual([])
})

const SERVICE = { targetPageTypeSlug: "streaming-service" }

test("a relation field of a record property is asked for as a relation is", () => {
  const definitions = [
    { id: "provider", type: "relation", config: SERVICE },
    {
      id: "partsStreamingOn",
      type: "text",
      fields: [{ id: "service", type: "relation", config: SERVICE }],
    },
  ]
  expect(relationSpecsOf(definitions, new Map())).toEqual([
    { propertyId: "provider", targetPageTypeSlug: "streaming-service" },
    { propertyId: "partsStreamingOn", fieldId: "service", targetPageTypeSlug: "streaming-service" },
  ])
})
