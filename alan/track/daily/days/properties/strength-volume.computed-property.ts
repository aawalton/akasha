import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type StrengthVolume = number

export const strengthVolume = {
  id: "01a077d1-f967-7eef-a0ce-7139eaa1b54d",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "strength-volume",
  propertySlug: "strength-volume",
  definition: "the weight Alan moved on one day, in pounds",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day's volume is the volume of every set naming that day.",
    },
    {
      invariantKind: "departure",
      statement: "A set's volume is worked out on the page of the set.",
    },
    {
      invariantKind: "departure",
      statement: "A day's volume is rounded where a set's volume is not.",
    },
    {
      invariantKind: "departure",
      statement: "A day no set names is worth nothing rather than no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A day counts the sets naming that day rather than the sets dated alike.",
    },
  ],
} as const satisfies ComputedProperty
