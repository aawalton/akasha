import type { Command } from "@akasha/command-system/command"

export const mobileSimTeardown = {
  id: "01a0685d-ceae-700e-bb0c-c5b113d526fd",
  pageTypeSlug: "command",
  slug: "mobile-sim-teardown",
  definition: "the command ending the simulator session standing",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--stop-appium", takes: "stop the mac's Appium server as well as ending the session" },
  ],
  helpNotes: [
    "the Appium server is left running by default, since something driving the simulator by hand may be using it.",
    "a session Appium has already dropped is forgotten here rather than treated as a failure.",
    "no session standing is nothing to end rather than a refusal.",
    "the simulator itself is left booted, and `mobile sim boot` finds it again.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The Appium server is left running unless stopping it is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A session Appium no longer holds is forgotten rather than refused over.",
    },
    {
      invariantKind: "departure",
      statement: "What is written down is cleared whether or not the session was still there.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here shuts a simulator down.",
    },
  ],
} as const satisfies Command
