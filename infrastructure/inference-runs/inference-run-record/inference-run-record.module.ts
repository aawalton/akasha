import type { Module } from "@akasha/code-system/module"

export const inferenceRunRecord = {
  id: "01a0685d-4b35-700f-9344-dd7d49bdb87d",
  pageTypeSlug: "module",
  slug: "inference-run-record",
  definition: "what is written down when a run starts and what is added when it ends",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run starts as running and ends as completed or failed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parameter the caller left out is left off the record rather than written as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A record carries the versions the service ran at the moment it ran.",
    },
    {
      invariantKind: "departure",
      statement: "A record carries the command line that asked for it.",
    },
  ],
} as const satisfies Module
