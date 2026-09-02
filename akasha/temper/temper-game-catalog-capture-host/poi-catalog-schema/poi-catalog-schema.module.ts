import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const poiCatalogSchema = {
  id: "01a06084-d419-7e65-9fe0-2100e873d96e",
  pageTypeSlug: "module",
  slug: "poi-catalog-schema",
  definition: "the zod schema reading the points of interest catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A zone holds the points of interest found in that zone.",
    },
    {
      invariantKind: "departure",
      statement: "A zone key and a point of interest key are both numbers.",
    },
    {
      invariantKind: "constraint",
      statement: "A property outside the named set is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The inferred type is checked against the shape in `temper-capture-shapes`.",
    },
  ],
} as const satisfies Module
