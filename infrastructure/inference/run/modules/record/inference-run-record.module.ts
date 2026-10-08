import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceRunRecord = {
  id: "01a0685d-4b35-700f-9344-dd7d49bdb87d",
  type: "page-type/module",
  slug: "inference-run-record",
  definition: "what a run was asked",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A parameter the caller left out is left off the record rather than written as absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record has the versions the service ran at the moment the run ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record has the command line that asked for the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That command line is the call the command was handed rather than a name its code spells.",
    },
  ],
  createdAt: "2026-09-03T17:42:19.701Z",
  updatedAt: "2026-09-26T16:51:37.000Z",
} as const satisfies Module
