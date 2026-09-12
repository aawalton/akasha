import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimOpenUrl = {
  id: "01a0685d-ceae-7009-892c-425eee9c835b",
  type: "command",
  slug: "mobile-sim-open-url",
  definition: "the command opening a route in the simulator and leaving a session at it",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "departure",
      statement: "A session already there on the same simulator is reused.",
    },
    {
      invariantKind: "departure",
      statement: "An identity is put in before a route is navigated to.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying nothing about identity signs in as the throwaway.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing is changed through Alan's own identity.",
    },
    {
      invariantKind: "departure",
      statement: "The webview is taken hold of again after a navigation.",
    },
    {
      invariantKind: "departure",
      statement: "An opening that threw part way names in its refusal what it had already done.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call naming no simulator takes the session's own simulator or the first booted simulator.",
    },
    {
      invariantKind: "departure",
      statement:
        "An Appium server this started and a simulator this booted are named in the refusal.",
    },
  ],
  name: "open-url",
  arguments: [
    { argument: "argument/app" },
    { argument: "argument/udid" },
    { argument: "argument/route", required: true, saidAs: "flag-or-word" },
    { argument: "argument/kb-debug" },
    { argument: "argument/as-real-user" },
  ],
} as const satisfies Command
