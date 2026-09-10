import type { FileProperty } from "../../file-properties/file-property.page-type.types.ts"

export type TypeGenerator = "ts"

export const typeGenerator = {
  id: "01a0879f-931a-78e7-a5ea-03409cb5ee56",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "type-generator",
  propertySlug: "type-generator",
  definition: "the code that writes the type a page type has",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type stating this states the type that code writes.",
    },
    {
      invariantKind: "departure",
      statement: "The code here exports a function named `generateTypes`.",
    },
    {
      invariantKind: "departure",
      statement: "That function answers the bodies to write rather than writing them.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says when the code runs.",
    },
  ],
} as const satisfies FileProperty
