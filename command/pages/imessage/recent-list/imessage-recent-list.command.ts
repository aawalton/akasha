import type { Command } from "akasha/command/command.page-type.types.ts"

export const imessageRecentList = {
  id: "01a0685f-c8ed-7002-acaf-64c6ea2ab792",
  type: "page-type/command",
  slug: "imessage-recent-list",
  definition: "the command giving back the newest messages in the mac's message store",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row carries the moment, the way the message went, who it was with, and the text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The newest messages are taken and then answered oldest first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A contact has the answer to every conversation that contact is in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A contact matching nobody refuses rather than answering empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A limit of zero is refused rather than read as no limit.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here searches the text of a message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying no limit gives back twenty messages.",
    },
  ],
  name: "recent-list",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/limit", default: "20" },
    { argument: "argument/contact" },
  ],
} as const satisfies Command
