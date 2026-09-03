import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LastChapter = number

export const lastChapter = {
  id: "01a0657a-9ccd-7629-800d-515631354a44",
  pageTypeSlug: "number-property",
  slug: "last-chapter",
  propertySlug: "last-chapter",
  definition: "the number of the latest chapter a page draws on",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter is counted here rather than named.",
    },
  ],
} as const satisfies NumberProperty
