import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimStatus = {
  id: "01a0685d-ceae-700c-9489-e7e3a1062803",
  type: "command",
  slug: "mobile-sim-status",
  definition: "the command saying what simulator session is there",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "No session there is answered rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "That answer names the calls that would start a session.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a session is live is asked of Appium rather than read from the session written down.",
    },
    {
      invariantKind: "departure",
      statement: "A session is dead where Appium is down without Appium being asked.",
    },
    {
      invariantKind: "departure",
      statement: "An age is measured against the moment this command was called.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens or repairs or ends a session.",
    },
  ],
  name: "status",
} as const satisfies Command
