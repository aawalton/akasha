import type { Command } from "@akasha/command-system/command"

export const mobileSimStatus = {
  id: "01a0685d-ceae-700c-9489-e7e3a1062803",
  pageTypeSlug: "command",
  slug: "mobile-sim-status",
  definition: "the command saying what the simulator session standing is",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "no session standing is an answer rather than a refusal, and it says which calls would start one.",
    "the session is asked whether it is live rather than believed from what is written down.",
    "a session written down that Appium no longer holds is said to be dead rather than repaired here.",
    "the age is measured from when the session was opened against the moment this was called.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "No session standing is answered rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a session is live is asked of Appium rather than read from what is written down.",
    },
    {
      invariantKind: "departure",
      statement: "A session is dead where Appium is down, without Appium being asked.",
    },
    {
      invariantKind: "departure",
      statement: "An age is measured against the moment this command was called.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens, repairs or ends a session.",
    },
  ],
} as const satisfies Command
