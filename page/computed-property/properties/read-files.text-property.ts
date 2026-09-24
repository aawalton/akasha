import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const readFiles = {
  id: "01a0d4d7-712b-7987-bcd6-8e8fbfe0194b",
  type: "page-type/text-property",
  slug: "read-files",
  propertySlug: "read-files",
  definition: "each file a computed property's calculation reads",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a calculation reads is kept as the file that page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is kept as the path the page service reached it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file read by working out any page is kept, and none is taken away.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
