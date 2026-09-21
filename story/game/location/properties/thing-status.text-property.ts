import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const thingStatus = {
  id: "01a0c645-f558-7eac-8d58-205cff99a22c",
  type: "page-type/text-property",
  slug: "thing-status",
  propertySlug: "status",
  definition: "what has become of a thing in a place since the play reached it",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing nobody has touched says nothing here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
