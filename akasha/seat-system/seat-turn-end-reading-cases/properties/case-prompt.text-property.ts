import type { TextProperty } from "@akasha/pages-system/text-property"

export type CasePrompt = string

export const casePrompt = {
  id: "01a06861-1917-78bb-86d3-15aa907963ad",
  pageTypeSlug: "text-property",
  slug: "case-prompt",
  propertySlug: "case-prompt",
  definition: "the words a turn end was handed before the answer it is owed was settled",
  max: 2000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A prompt is kept whole, so the case replays from itself.",
    },
  ],
} as const satisfies TextProperty
