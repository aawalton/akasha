import type { SelectProperty } from "@akasha/pages-system/select-property"

export const messageWarrant = {
  id: "01a06818-107b-7002-8cb9-81d4d299a260",
  pageTypeSlug: "select-property",
  slug: "message-warrant",
  propertySlug: "warrant",
  definition: "what a message claims of the sender while it waits",
  values: ["announce", "blocked"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A blocked warrant claims the sender is waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A blocked warrant claims nothing of anyone but the sender.",
    },
    {
      invariantKind: "departure",
      statement: "An announced message claims nothing of the sender.",
    },
    {
      invariantKind: "departure",
      statement: "An announce is not a reason for its sender to keep running.",
    },
    {
      invariantKind: "departure",
      statement: "The answer to a blocked message reaches the sender's mailbox.",
    },
  ],
} as const satisfies SelectProperty

export type MessageWarrant = (typeof messageWarrant.values)[number]
