import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const code = {
  id: "01a04a20-6e04-7e3d-88e8-a8af6fd9c02b",
  type: "page-type/code-file-property",
  slug: "code",
  propertySlug: "code",
  definition: "the code a page is",
  extensions: ["ts", "tsx"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Code is written in TypeScript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code drawing something for a browser is written in TSX.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "TSX is TypeScript the parser admits JSX into.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-28T20:47:14.436Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies CodeFileProperty
