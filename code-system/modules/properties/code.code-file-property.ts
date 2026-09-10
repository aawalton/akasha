import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export type Code = "ts" | "tsx"

export const code = {
  id: "01a04a20-6e04-7e3d-88e8-a8af6fd9c02b",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "code",
  propertySlug: "code",
  definition: "the code a page is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Code is written in TypeScript.",
    },
    {
      invariantKind: "departure",
      statement: "Code drawing something for a browser is written in TSX.",
    },
    {
      invariantKind: "departure",
      statement: "TSX is TypeScript the parser admits JSX into.",
    },
  ],
} as const satisfies CodeFileProperty
