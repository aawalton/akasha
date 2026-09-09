import type { Module } from "@akasha/code/module"
import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { PageType } from "../types/page-type.page-type.ts"
import type { Holds } from "./properties/holds.select-property.ts"

export type ComputedProperty = Module &
  PageProperty & {
    holds: Holds
  }

export type Reach = {
  target: <Held>(slug: string) => Held | null
  naming: <Held>(propertySlug: string) => readonly Held[]
}

export type Work<Page, Held> = (page: Page, reach: Reach) => Held | null

export const computedProperty = {
  id: "01a06e70-0f25-77ad-9080-95388ef3ba51",
  pageTypeSlug: "page-type",
  slug: "computed-property",
  definition: "a page property a function works out from the page",
  pluralSlug: "computed-properties",
  extends: ["page-type/module", "page-type/page-property"],
  parts: ["select-property/holds"],
  properties: [{ pageProperty: "select-property/holds", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page has no value for a computed property.",
    },
    {
      invariantKind: "departure",
      statement: "A page file stating a value for a computed property is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A computed property's calculation is a function the code file beside the page exports.",
    },
    {
      invariantKind: "departure",
      statement: "The function a computed property's code file exports is named `work`.",
    },
    {
      invariantKind: "departure",
      statement: "A computed property states the kind of value the calculation works out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A calculation answering another kind than the computed property states is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation is handed the page whose computed property is being worked out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A calculation reaches another page only through the reach that calculation is handed.",
    },
    {
      invariantKind: "departure",
      statement: "A reach names one page or every page naming the page being worked out.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages naming one page are reached under the relation property that names that page.",
    },
    {
      invariantKind: "departure",
      statement: "Each page a reach answers is worked as lazily as the page handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "The shape of a reach is declared here rather than beside the engine working a calculation.",
    },
    {
      invariantKind: "departure",
      statement: "A query may answer with a computed property's key.",
    },

    {
      invariantKind: "departure",
      statement: "A calculation answering absent puts no key in the row.",
    },
    {
      invariantKind: "absence",
      statement: "No calculation is written as an expression the system parses.",
    },
  ],
} as const satisfies PageType
