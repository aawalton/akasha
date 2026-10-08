import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileSimStatus = {
  id: "01a0685d-ceae-700c-9489-e7e3a1062803",
  type: "page-type/command",
  slug: "mobile-sim-status",
  definition: "the command saying what simulator session is there",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "No session there is answered rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That answer names the calls that would start a session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a session is live is asked of Appium rather than read from the session written down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is dead where Appium is down without Appium being asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An age is measured against the moment this command was called.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens or repairs or ends a session.",
    },
  ],
  name: "status",
  arguments: [],
  createdAt: "2026-09-03T17:42:53.358Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Command
