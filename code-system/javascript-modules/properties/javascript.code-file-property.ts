import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type Javascript = "mjs"

export const javascript = {
  id: "01a06954-f7dc-7da3-abd6-1b92e38df030",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "javascript",
  propertySlug: "javascript",
  definition: "the JavaScript a page is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "JavaScript a runtime loads as a module has the `mjs` extension.",
    },
  ],
} as const satisfies CodeFileProperty
