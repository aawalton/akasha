import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const swift = {
  id: "01a05474-5474-79c9-8775-7972372e85d6",
  type: "page-type/code-file-property",
  slug: "swift",
  propertySlug: "swift",
  definition: "the Swift a page is",
  extensions: ["swift"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A check judges whether the Swift a landing carries parses.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T20:55:05.076Z",
  updatedAt: "2026-09-24T22:43:28.000Z",
} as const satisfies CodeFileProperty
