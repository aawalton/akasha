import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FirstChapter = number

export const firstChapter = {
  id: "01a0657a-9ccd-73d3-80f7-ae7f84d136d4",
  pageTypeSlug: "number-property",
  slug: "first-chapter",
  propertySlug: "first-chapter",
  definition: "the number of the earliest chapter a page draws on",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter is counted here rather than named.",
    },
  ],
} as const satisfies NumberProperty
