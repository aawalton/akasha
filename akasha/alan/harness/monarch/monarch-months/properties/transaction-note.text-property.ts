import type { TextProperty } from "@akasha/pages-system/text-property"

export type TransactionNote = string

export const transactionNote = {
  id: "01a0680b-2b00-7007-9e41-3f7b6c5a2108",
  pageTypeSlug: "text-property",
  slug: "transaction-note",
  propertySlug: "transaction-note",
  definition: "what somebody wrote on a transaction",
  max: 2000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A note is written only where Monarch, read at that moment, reports the note empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "Monarch keeps no earlier version, so a note replaced and a note nobody wrote read the same.",
    },
  ],
} as const satisfies TextProperty
