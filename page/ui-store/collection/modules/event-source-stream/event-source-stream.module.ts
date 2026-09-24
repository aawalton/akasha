import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const eventSourceStream = {
  id: "01a0d5a2-48bb-7323-a0ac-228656af3962",
  type: "page-type/module",
  slug: "event-source-stream",
  definition: "the stream of named events a browser's event source opens",
  code: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Bun has no event source, so only a browser opens this stream.",
    },
  ],
} as const satisfies Module
