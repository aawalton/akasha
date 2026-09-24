import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const readFolders = {
  id: "01a0d4d7-874a-797c-8caa-764637afaa90",
  type: "page-type/text-property",
  slug: "read-folders",
  propertySlug: "read-folders",
  definition: "each folder a computed property's calculation reads",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder a calculation lists is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder holding more than eight files a calculation reads is kept in place of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder kept stands for every file in it, and those files are not kept as well.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
