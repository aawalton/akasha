import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const lastChapter = {
  id: "01a0657a-9ccd-7629-800d-515631354a44",
  type: "page-type/number-property",
  slug: "last-chapter",
  propertySlug: "last-chapter",
  definition: "the number of a page's latest chapter",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is counted here rather than named.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:15:29.485Z",
  updatedAt: "2026-09-22T14:08:59.000Z",
} as const satisfies NumberProperty
