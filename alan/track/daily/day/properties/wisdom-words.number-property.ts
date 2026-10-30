import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const wisdomWords = {
  id: "01a0683b-dafc-75d4-8d75-4397a5661173",
  type: "page-type/number-property",
  slug: "wisdom-words",
  propertySlug: "wisdom-words",
  definition: "the words written on a day in the pages about Alan",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day whose commits left Alan's topic pages untouched reads zero rather than unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No day before 2026-09-06 has this reading.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:05:48.284Z",
  updatedAt: "2026-10-30T16:43:11.155Z",
} as const satisfies NumberProperty
