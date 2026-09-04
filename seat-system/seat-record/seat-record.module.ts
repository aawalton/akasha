import type { Module } from "@akasha/code-system/module"

export const seatRecord = {
  id: "01a06949-b281-7a28-8dc0-ad7ecff7be76",
  pageTypeSlug: "module",
  slug: "seat-record",
  definition: "one value a seat carries under a key, read from akasha and kept beside the seat",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's value is read from akasha rather than from any other store.",
    },
    {
      invariantKind: "departure",
      statement: "An empty agent name reads nothing and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An empty value is not written.",
    },
    {
      invariantKind: "departure",
      statement: "A write finds the seat's name first and does nothing when there is none.",
    },
    {
      invariantKind: "departure",
      statement: "A failure while writing returns quietly instead of reaching the agent's screen.",
    },
    {
      invariantKind: "departure",
      statement: "A backfill writes only where the key holds nothing yet.",
    },
  ],
} as const satisfies Module
