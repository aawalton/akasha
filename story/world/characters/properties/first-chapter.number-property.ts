import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const firstChapter = {
  id: "01a0657a-9ccd-73d3-80f7-ae7f84d136d4",
  type: "page-type/number-property",
  slug: "first-chapter",
  propertySlug: "first-chapter",
  definition: "the number of the earliest chapter a page draws on",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is counted here rather than named.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
