import type { FileProperty } from "@akasha/pages-system/file-property"

export type Javascript = "mjs"

export const javascript = {
  id: "01a06954-f7dc-7da3-abd6-1b92e38df030",
  pageTypeSlug: "file-property",
  slug: "javascript",
  propertySlug: "javascript",
  definition: "the JavaScript a page is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "JavaScript a runtime loads as a module carries the `mjs` extension.",
    },
  ],
} as const satisfies FileProperty
