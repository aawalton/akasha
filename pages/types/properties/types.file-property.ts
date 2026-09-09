import type { FileProperty } from "../../file-properties/file-property.page-type.ts"

export type Types = "ts"

export const types = {
  id: "01a0879f-af02-7fcb-8c36-cd34429f89ab",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "types",
  propertySlug: "types",
  definition: "the type with a page type's stored keys beside its calculations",
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type stating this states the code that writes the file.",
    },
    {
      invariantKind: "departure",
      statement: "This type is named for the page type it belongs to.",
    },
    {
      invariantKind: "departure",
      statement: "A page type states its type here rather than in the page type's own file.",
    },
  ],
} as const satisfies FileProperty
