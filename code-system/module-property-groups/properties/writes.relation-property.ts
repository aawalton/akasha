import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const writes = {
  id: "01a08dec-e152-7557-be8e-a5af18305b25",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "writes",
  propertySlug: "writes",
  definition: "the file property a group's code writes",
  targetPageType: "page-type/file-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group naming a file property writes the file that property holds.",
    },
    {
      invariantKind: "departure",
      statement: "The file written sits beside the page carrying the group.",
    },
    {
      invariantKind: "gap",
      statement: "The runner writing a group's file reads the file property named here.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
