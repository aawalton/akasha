import type { Module } from "../../code-system/modules/module.page-type.ts"

export const channelDelivery = {
  id: "01a0657e-795c-7001-943b-4973f01721fa",
  pageTypeSlug: "module",
  slug: "channel-delivery",
  definition: "what a seat's transcript says became of a channel message queued to that seat",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transcript line this cannot read is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A message is injected only where the transcript holds the injection itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message the seat found in its own inbox is apart from one the channel woke the seat with.",
    },
    {
      invariantKind: "departure",
      statement: "A message is overtaken where a message queued after is injected instead.",
    },
    {
      invariantKind: "departure",
      statement: "A message still unseen more than four turns after it was queued is lost.",
    },
    {
      invariantKind: "departure",
      statement: "A message the session ended without showing is lost.",
    },
    {
      invariantKind: "departure",
      statement: "A seat mid-turn reads the same as a seat that swallowed the message.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript holding no enqueue of the message is absent rather than lost.",
    },
    {
      invariantKind: "departure",
      statement: "One injected transcript settles the whole set however many others saw nothing.",
    },
  ],
} as const satisfies Module
