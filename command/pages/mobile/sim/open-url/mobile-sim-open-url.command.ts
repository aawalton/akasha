import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileSimOpenUrl = {
  id: "01a0685d-ceae-7009-892c-425eee9c835b",
  type: "page-type/command",
  slug: "mobile-sim-open-url",
  definition: "the command opening a route in the simulator and leaving a session at it",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session already there on the same simulator is reused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An identity is put in before a route is navigated to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying nothing about identity signs in as the throwaway.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Nothing is changed through Alan's own identity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The webview is taken hold of again after a navigation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An opening that threw part way names in its refusal what it had already done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call naming no simulator takes the session's own simulator or the first booted simulator.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An Appium server this started and a simulator this booted are named in the refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An Appium server started is named before the wait for it to answer.",
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
