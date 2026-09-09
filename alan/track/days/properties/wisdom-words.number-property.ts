import type { NumberProperty } from "@akasha/pages/number-property"

export type WisdomWords = number

export const wisdomWords = {
  id: "01a0683b-dafc-75d4-8d75-4397a5661173",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "wisdom-words",
  propertySlug: "wisdom-words",
  definition: "the words Alan added to the pages about himself on a day",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A day whose commits left Alan's topic pages untouched reads zero rather than unread.",
    },
    {
      invariantKind: "departure",
      statement: "No day before 2026-09-06 has this reading.",
    },
  ],
} as const satisfies NumberProperty
