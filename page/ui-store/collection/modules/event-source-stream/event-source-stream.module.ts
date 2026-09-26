import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const eventSourceStream = {
  id: "01a0d5a2-48bb-7323-a0ac-228656af3962",
  type: "page-type/module",
  slug: "event-source-stream",
  definition: "the stream of named events a browser opens for page changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser reads the stream itself rather than through an event source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser's stream is read by the one reading a server's stream is read by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser's stream that goes silent has failed, as a server's does.",
    },
  ],
} as const satisfies Module
