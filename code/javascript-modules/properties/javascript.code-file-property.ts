import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const javascript = {
  id: "01a06954-f7dc-7da3-abd6-1b92e38df030",
  type: "code-file-property",
  slug: "javascript",
  propertySlug: "javascript",
  definition: "the JavaScript a page is",
  extensions: ["mjs"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "JavaScript a runtime loads as a module has the `mjs` extension.",
    },
  ],
  types: "ts",
} as const satisfies CodeFileProperty
