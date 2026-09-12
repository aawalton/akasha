import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const testedAgainOn = {
  id: "01a09328-17cc-74e3-94dd-556ce2757900",
  type: "calendar-date-property",
  slug: "tested-again-on",
  propertySlug: "tested-again-on",
  definition: "the day a constraint is tried against Alan again",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A constraint expected to remain forever states a day all the same.",
    },
  ],
  types: "ts",
} as const satisfies CalendarDateProperty
