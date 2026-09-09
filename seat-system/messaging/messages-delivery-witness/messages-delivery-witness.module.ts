import type { Module } from "@akasha/code/module"

export const messagesDeliveryWitness = {
  id: "01a0686c-f06b-7011-b06e-16258f8aa85f",
  pageTypeSlug: "module",
  type: "module",
  slug: "messages-delivery-witness",
  definition: "a message held claimed until the seat's transcript shows the seat was shown it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is let go only where a transcript has the injection itself.",
    },
    {
      invariantKind: "departure",
      statement: "A message shown to be lost is given up on rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A message whose seat is mid-turn is waited on however long that takes.",
    },
    {
      invariantKind: "departure",
      statement: "A message nothing can be told about is given up on after a few looks.",
    },
    {
      invariantKind: "departure",
      statement: "A message given up on stays claimed rather than being offered again.",
    },
    {
      invariantKind: "departure",
      statement:
        "The transcript the seat has now is read as well as the transcript that seat held then.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript that cannot be read is passed over rather than counted as silence.",
    },
  ],
} as const satisfies Module
