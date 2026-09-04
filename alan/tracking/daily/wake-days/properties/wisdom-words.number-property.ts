import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WisdomWords = number

export const wisdomWords = {
  id: "01a0683b-dafc-75d4-8d75-4397a5661173",
  pageTypeSlug: "number-property",
  slug: "wisdom-words",
  propertySlug: "wisdom-words",
  definition: "the words Alan added to the pages about himself on a day, net of what he removed",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A day whose commits left Alan's topic pages untouched reads zero rather than unread.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that took more words away than it added counts as zero.",
    },
    {
      invariantKind: "departure",
      statement: "No day before 2026-09-03 carries this reading.",
    },
  ],
} as const satisfies NumberProperty
