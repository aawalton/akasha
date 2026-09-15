import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dueReminderSending = {
  id: "01a0686a-7a57-78a3-96ed-968543d56042",
  type: "page-type/module",
  slug: "due-reminder-sending",
  definition: "each reminder whose schedule has come due turned into a message",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reminder that has come due becomes a message file and nothing else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whom the words reach is left to the recipient resolver.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The recipient resolver treats this message as that resolver treats any other message.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing in the sending reads a seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run finding many windows passed after the last sending sends once rather than once per window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reminder that has sent and repeats is armed again from now.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A reminder first seen with no time still to come is reported and left alone rather than taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A reminder whose schedule systemd refuses is reported and passed over rather than stopping the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reminder whose message is refused stays due.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A spent reminder still there after its removal was due is reported rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every run says the number of reminders sent and armed and taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run holding anything back ends non-zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message written is named as soon as that message is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reminder armed is named as soon as that reminder is armed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reminder taken away is named as soon as that page has gone.",
    },
  ],
} as const satisfies Module
