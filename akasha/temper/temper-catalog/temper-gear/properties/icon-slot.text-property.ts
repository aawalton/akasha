import type { TextProperty } from "@akasha/pages-system/text-property"

export type IconSlot = string

export const iconSlot = {
  id: "01a05fd1-d43b-783e-b447-1fb92ded8285",
  pageTypeSlug: "text-property",
  slug: "icon-slot",
  propertySlug: "slot",
  definition: "the piece an icon is shown for",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A star after a colon covers every weight of that piece.",
    },
  ],
} as const satisfies TextProperty
