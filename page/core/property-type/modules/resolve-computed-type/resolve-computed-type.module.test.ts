import { expect, test } from "bun:test"
import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { resolveComputedProperty } from "akasha/page/core/property-type/modules/resolve-computed-type/resolve-computed-type.module.code.ts"
import {
  drawnFor,
  firstDrawing,
} from "akasha/page/ui/component/modules/drawings-found/drawings-found.module.code.ts"
import { Glob } from "bun"

const ENDING = ".property-badge-component.code.tsx"

const FALLS_BACK_TO = "page-property"

const ROOT = new URL("../../../../../", import.meta.url).pathname

function drawings(): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const at of new Glob(`**/*${ENDING}`).scanSync({ cwd: ROOT })) {
    const slug = drawnFor(at, ENDING)
    if (slug !== null) found.set(slug, slug)
  }
  return found
}

const DRAWINGS = drawings()

function drawnAs(definition: PropertyDefinition): string | undefined {
  return firstDrawing(DRAWINGS, definition.drawnBy)
}

const NUMBER_DRAWN = ["number-property", FALLS_BACK_TO, "domain", "page"]

const RELATION_DRAWN = ["relation-property", FALLS_BACK_TO, "domain", "page"]

const FORMULA_DRAWN = ["formula-property", FALLS_BACK_TO, "domain", "page"]

const AGGREGATE_DRAWN = ["aggregate-property", FALLS_BACK_TO, "domain", "page"]

const ORDER = "page-type-order"

const CUSTOMER = "page-type-customer"

const CUSTOMER_PROPERTIES: readonly PropertyDefinition[] = [
  {
    id: "credit",
    title: "Credit",
    type: "number",
    drawnBy: NUMBER_DRAWN,
    config: { format: "number", units: "USD" },
  },
]

const ORDER_PROPERTIES: readonly PropertyDefinition[] = [
  {
    id: "customer",
    title: "Customer",
    type: "relation",
    drawnBy: RELATION_DRAWN,
    config: { targetPageTypeId: CUSTOMER },
  },
  {
    id: "doubledCredit",
    title: "Doubled Credit",
    type: "formula",
    drawnBy: FORMULA_DRAWN,
    config: { returnType: "number", format: "number" },
  },
  {
    id: "dueDay",
    title: "Due Day",
    type: "formula",
    drawnBy: FORMULA_DRAWN,
    config: { returnType: "calendar-date" },
  },
  {
    id: "creditSum",
    title: "Credit Sum",
    type: "aggregate",
    drawnBy: AGGREGATE_DRAWN,
    config: { relationPropertyId: "customer", targetPropertyId: "credit", function: "sum" },
  },
]

const PROPERTIES: PageTypePropertiesMap = new Map([
  [ORDER, ORDER_PROPERTIES],
  [CUSTOMER, CUSTOMER_PROPERTIES],
])

function declared(id: string): PropertyDefinition {
  const one = ORDER_PROPERTIES.find((each) => each.id === id)
  if (one === undefined) throw new Error(`no property beside this test is named \`${id}\``)
  return one
}

function resolved(id: string): PropertyDefinition {
  return resolveComputedProperty(declared(id), PROPERTIES)
}

test("the drawings read here are the ones beside the page types", () => {
  expect(DRAWINGS.has("number-property")).toBe(true)
  expect(DRAWINGS.has("relation-property")).toBe(true)
  expect(DRAWINGS.has(FALLS_BACK_TO)).toBe(true)
  expect(DRAWINGS.has("formula-property")).toBe(false)
  expect(DRAWINGS.has("aggregate-property")).toBe(false)
})

test("a formula answering a number is drawn as a number", () => {
  const one = resolved("doubledCredit")

  expect(one.type).toBe("number")
  expect(drawnAs(one)).toBe("number-property")
})

test("an aggregate is drawn as the number it works out", () => {
  const one = resolved("creditSum")

  expect(one.type).toBe("number")
  expect(drawnAs(one)).toBe("number-property")
})

test("a resolved type no property here carries a chain for keeps the chain it was declared by", () => {
  const one = resolved("dueDay")

  expect(one.type).toBe("calendar-date")
  expect(one.drawnBy).toEqual(FORMULA_DRAWN)
})

test("a property that works nothing out is answered as it was handed in", () => {
  const one = declared("customer")

  expect(resolveComputedProperty(one, PROPERTIES)).toBe(one)
})
