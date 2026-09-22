import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const questStatus = {
  id: "01a0c6ac-515c-7566-9f2a-b14bd92f3a34",
  type: "page-type/text-property",
  slug: "quest-status",
  propertySlug: "status",
  definition: "where a quest is: active while it is being pursued, complete once it is done",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest offered and not yet taken up is active.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
