import type { Module } from "@akasha/code/module"

export const dueReminderSending = {
  id: "01a0686a-7a57-78a3-96ed-968543d56042",
  pageTypeSlug: "module",
  type: "module",
  slug: "due-reminder-sending",
  definition: "each reminder whose schedule has come due turned into a message",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reminder that has come due becomes a message file and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "Whom the words reach is left to the recipient resolver.",
    },
    {
      invariantKind: "departure",
      statement:
        "The recipient resolver treats this message as that resolver treats any other message.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing in the sending reads a seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run finding many windows passed after the last sending sends once rather than once per window.",
    },
    {
      invariantKind: "departure",
      statement: "A reminder that has sent and repeats is armed again from now.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reminder first seen with no time still to come is reported and left alone rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reminder whose schedule systemd refuses is reported and passed over rather than stopping the run.",
    },
    {
      invariantKind: "departure",
      statement: "A reminder whose message is refused stays due.",
    },
    {
      invariantKind: "departure",
      statement:
        "A spent reminder still there after its removal was due is reported rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every run says the number of reminders sent and armed and taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A run holding anything back ends non-zero.",
    },
  ],
} as const satisfies Module
