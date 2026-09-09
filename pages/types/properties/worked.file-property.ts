import type { FileProperty } from "../../file-properties/file-property.page-type.ts"

export type Worked = "ts"

export const worked = {
  id: "01a07662-d334-7c99-8844-784e0d758cc1",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "worked",
  propertySlug: "worked",
  definition: "the type with a page type's calculations beside its stored keys",
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type with a calculation states this property.",
    },
    {
      invariantKind: "departure",
      statement: "The file this property has is written by a command rather than by an author.",
    },
  ],
} as const satisfies FileProperty
