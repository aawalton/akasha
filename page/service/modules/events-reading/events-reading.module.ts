import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const eventsReading = {
  id: "01a0d4f5-6b01-7fe3-9c54-388642cf329e",
  type: "page-type/module",
  slug: "events-reading",
  definition: "the stream of page changes read as named events by a caller that is no browser",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An event is named by its `event` line and carries its `data` lines joined.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A block naming no data is no event, so a beat is heard as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream that ends, fails or is refused is heard as an `error` event once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream closed by its caller is heard as nothing more.",
    },
  ],
} as const satisfies Module
