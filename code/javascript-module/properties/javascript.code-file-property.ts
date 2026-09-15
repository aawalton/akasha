import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const javascript = {
  id: "01a06954-f7dc-7da3-abd6-1b92e38df030",
  type: "page-type/code-file-property",
  slug: "javascript",
  propertySlug: "javascript",
  definition: "the JavaScript a page is",
  extensions: ["mjs"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "JavaScript a runtime loads as a module has the `mjs` extension.",
    },
  ],
  types: "ts",
} as const satisfies CodeFileProperty
