import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export type Test = "ts" | "tsx"

export const test = {
  id: "01a04a2e-7e3e-7000-acbe-3a33ab105ce0",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "test",
  propertySlug: "test",
  definition: "what proves a page's code",
  maxCpuSeconds: 5,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test proving code written in TSX is written in TSX too.",
    },
  ],
} as const satisfies CodeFileProperty
