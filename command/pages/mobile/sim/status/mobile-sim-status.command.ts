import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileSimStatus = {
  id: "01a0685d-ceae-700c-9489-e7e3a1062803",
  type: "page-type/command",
  slug: "mobile-sim-status",
  definition: "the command saying what simulator session is there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "No session there is answered rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That answer names the calls that would start a session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether a session is live is asked of Appium rather than read from the session written down.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session is dead where Appium is down without Appium being asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An age is measured against the moment this command was called.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens or repairs or ends a session.",
    },
  ],
  name: "status",
  arguments: [],
} as const satisfies Command
