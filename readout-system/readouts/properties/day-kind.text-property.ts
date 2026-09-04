import type { TextProperty } from "@akasha/pages-system/text-property"

export type DayKind = "eso-day" | "wake-day"

export const dayKind = {
  id: "01a06559-e74c-7f4b-b828-4c1766cf90e4",
  pageTypeSlug: "text-property",
  slug: "day-kind",
  propertySlug: "day-kind",
  definition: "which of the two days a reading counts on",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout stating nothing counts on the day Alan woke into.",
    },
  ],
} as const satisfies TextProperty
