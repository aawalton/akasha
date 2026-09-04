import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type SpannedFromDayBoundary = boolean

export const spannedFromDayBoundary = {
  id: "01a06148-644d-764d-95d4-62650b707856",
  pageTypeSlug: "boolean-property",
  slug: "spanned-from-day-boundary",
  propertySlug: "spanned-from-day-boundary",
  definition: "whether the day was spanned from the day boundary rather than from a recorded wake",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This says how the day was spanned rather than that a figure on it is wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A day spanned from the boundary often holds a figure that is right anyway.",
    },
    {
      invariantKind: "departure",
      statement: "A day is spanned from the boundary where either end of its span was.",
    },
    {
      invariantKind: "departure",
      statement: "A day is marked where its span is decided rather than where a figure lands.",
    },
    {
      invariantKind: "departure",
      statement: "One writer marks a day.",
    },
    {
      invariantKind: "departure",
      statement: "A day the engine writes states this either way rather than only when true.",
    },
  ],
} as const satisfies BooleanProperty
