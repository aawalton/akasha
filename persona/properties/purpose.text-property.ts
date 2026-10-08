import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const purpose = {
  id: "01a05333-723a-7ec2-85ad-b5aa0b77a8af",
  type: "page-type/text-property",
  slug: "purpose",
  propertySlug: "purpose",
  definition: "a persona's purpose",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing that only helps another purpose is not a purpose.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T15:04:35.642Z",
  updatedAt: "2026-09-25T15:21:36.000Z",
} as const satisfies TextProperty
