import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const lastMessagedAt = {
  id: "01a05398-caad-7428-b9a6-ec3a8f09470c",
  type: "page-type/text-property",
  slug: "last-messaged-at",
  propertySlug: "last-messaged-at",
  definition: "when Alan last wrote to a persona",
  maxLength: 24,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "No name format exists for an instant.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
