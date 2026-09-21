import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataEncodeRuntime = {
  id: "01a06061-96a0-7c1f-a7ed-6104c85448b3",
  type: "page-type/module",
  slug: "data-encode-runtime",
  definition: "whether the library is logging and where a log line is sent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A log line is sent to the debug logger addon where that addon is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A log line goes nowhere where the library is not in debug.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Debug is on for a single named account and for no other account.",
    },
  ],
} as const satisfies Module
