import type { Module } from "@akasha/code-system/module"

export const dueReminderSending = {
  id: "01a0686a-7a57-78a3-96ed-968543d56042",
  pageTypeSlug: "module",
  slug: "due-reminder-sending",
  definition: "each reminder whose schedule has come due turned into a message",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a reminder that has come due becomes is a message file, and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whom the words reach is left to the recipient resolver, which treats this message as it treats any other.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing in the sending knows what a seat is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run finding many windows have passed since the last sending sends once rather than once per window.",
    },
    {
      invariantKind: "departure",
      statement: "A reminder that has sent and repeats is armed again from now.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reminder first seen whose schedule names no time still to come is reported and left alone rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reminder whose schedule systemd will not read is reported and passed over rather than stopping the run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reminder whose message is refused stays due, so the next run tries that reminder again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A spent reminder still standing after it was to be taken away is reported rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every run says how many sent, how many were armed and how many were taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A run holding anything back ends non-zero.",
    },
  ],
} as const satisfies Module
