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
  createdAt: "2026-09-03T22:12:51.292Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies CodeFileProperty
