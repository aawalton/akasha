import type { NumberProperty } from "@akasha/pages/number-property"

export type IntelligenceTopics = number

export const intelligenceTopics = {
  id: "01a07888-4add-7d40-bd0c-b16400fe380b",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "intelligence-topics",
  propertySlug: "intelligence-topics",
  definition: "the learn-everything topics a day's commits added or changed",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A day whose commits left the learn-everything topics alone reads zero rather than unread.",
    },
    {
      invariantKind: "departure",
      statement: "A topic a day changed more than once counts once.",
    },
    {
      invariantKind: "departure",
      statement: "A topic whose file only moved counts as no topic updated.",
    },
    {
      invariantKind: "departure",
      statement: "No day before 2026-09-06 has this reading.",
    },
  ],
} as const satisfies NumberProperty
