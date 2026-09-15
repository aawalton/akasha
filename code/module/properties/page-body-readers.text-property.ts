import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const pageBodyReaders = {
  id: "01a08e84-95cf-74db-9e18-8f4daed823be",
  type: "text-property",
  slug: "page-body-readers",
  propertySlug: "page-body-readers",
  definition: "the name a module exports for reading a page body off a checkout root",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module declares a reader here rather than a reader's caller holding a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name declared here is an export of the module declaring it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module saying nothing here declares no reader of page bodies.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reader is what a module declares rather than what a body is seen to do.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
