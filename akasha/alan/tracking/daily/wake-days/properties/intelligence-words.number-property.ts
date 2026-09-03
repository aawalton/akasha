import type { NumberProperty } from "@akasha/pages-system/number-property"

export type IntelligenceWords = number

export const intelligenceWords = {
  id: "01a0683b-db4b-7f67-9d05-f46d9165024c",
  pageTypeSlug: "number-property",
  slug: "intelligence-words",
  propertySlug: "intelligence-words",
  definition: "the words added to the learn-everything topics on a day, net of what was removed",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A day whose commits left the learn-everything topics untouched reads zero rather than unread.",
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
