import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const propertyShaping = {
  id: "01a091e7-e2ef-7749-b938-fe724b6673e5",
  type: "module",
  slug: "property-shaping",
  definition: "the shape each page property declares, read from one file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every shape the pages declare is read from the declaring index.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is keyed by the page type a property is and then that property's slug.",
    },
    {
      invariantKind: "departure",
      statement: "The first line a property is filed under answers for that property.",
    },
    {
      invariantKind: "departure",
      statement: "Every shape is read once for a reading and held.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file for one property alone.",
    },
  ],
} as const satisfies Module
