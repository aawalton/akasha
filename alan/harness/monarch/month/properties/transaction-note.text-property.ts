import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const transactionNote = {
  id: "01a0680b-2b00-7007-9e41-3f7b6c5a2108",
  type: "page-type/text-property",
  slug: "transaction-note",
  propertySlug: "transaction-note",
  definition: "the note on a Monarch transaction",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A note is written only where Monarch reports the note empty at that moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Monarch keeps no earlier version.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A note replaced and a note nobody wrote read the same.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:44:07.108Z",
} as const satisfies TextProperty
