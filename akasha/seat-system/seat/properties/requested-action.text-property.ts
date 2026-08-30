import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type RequestedAction = string

export const requestedAction = {
  id: "01a0542c-d18d-723c-8b98-1841c0eeef14",
  pageTypeSlug: "text-property",
  slug: "requested-action",
  propertySlug: "action",
  definition: "what a seat has been asked to do",
  max: 40,
  nameFormatSlug: "name-format/lower-snake-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat is asked to restart preserving its context or to restart once idle or to swap its proxy.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a seat action.",
    },
  ],
} as const satisfies TextProperty
