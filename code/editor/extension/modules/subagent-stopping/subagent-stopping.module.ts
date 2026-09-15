import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentStopping = {
  id: "01a09c6d-a6d5-79aa-aa3b-6c3d88456b4c",
  type: "module",
  slug: "subagent-stopping",
  definition: "a subagent stopped from the agents panel, confirmed and then asked of the harness",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent row's context value says whether that subagent was stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A stop reaches only a row that is a subagent.",
    },
    {
      invariantKind: "departure",
      statement:
        "The subagent stopped is named as its page is named, read off the page the row names.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming no page stops nothing and says so.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent stopped already is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A stop is confirmed before anything is asked of the harness.",
    },
    {
      invariantKind: "departure",
      statement: "The confirmation says the stop takes effect at the subagent's next model turn.",
    },
    {
      invariantKind: "departure",
      statement: "The confirmation says a subagent inside a tool call finishes that call first.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stop asks `akasha agent subagent-stop` through the harness, as a seat's acts do.",
    },
    {
      invariantKind: "departure",
      statement: "A stop that failed is said on the channel and shown to Alan.",
    },
    {
      invariantKind: "departure",
      statement: "A stop asks for the file again rather than waiting to be told.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ends a process.",
    },
  ],
} as const satisfies Module
