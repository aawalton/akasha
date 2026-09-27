import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageThreading = {
  id: "01a0e2f6-e95d-79a4-b210-9cbd5bc5df3c",
  type: "page-type/module",
  slug: "page-threading",
  definition: "the reading threads a read arriving over HTTP is answered on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Four reading threads answer reads at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a question, a read, a shape or a file arriving by POST goes to a thread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read goes to the running thread with the fewest reads waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thread runs the code the service was started from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thread starts only the code that answers a read.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A thread hears nothing until the run it was started with has returned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer from a thread names in a header the thread that answered it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thread that is lost answers what it held as a fault of the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thread that is lost is started again a second later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The heap each thread last told is said in one line, a thread not running as `-`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No write, landing, follow or stream goes to a thread.",
    },
  ],
} as const satisfies Module
