import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimTeardown = {
  id: "01a0685d-ceae-700e-bb0c-c5b113d526fd",
  type: "command",
  slug: "mobile-sim-teardown",
  definition: "the command ending the simulator session that is there",
  code: "ts",
  test: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "No session there is nothing to end rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The Appium server is left running unless stopping that server is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A session Appium no longer holds is forgotten rather than refused over.",
    },
    {
      invariantKind: "departure",
      statement: "The session record is cleared whether or not the session was still there.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here shuts a simulator down.",
    },
    {
      invariantKind: "departure",
      statement: "Each thing torn down is named as soon as that thing is torn down.",
    },
    {
      invariantKind: "departure",
      statement: "A teardown that threw part way names those things in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The ending, the clearing and the stopping are handed in.",
    },
  ],
  name: "teardown",
  arguments: [{ argument: "argument/stop-appium" }],
} as const satisfies Command
