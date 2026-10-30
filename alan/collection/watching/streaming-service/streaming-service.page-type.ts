import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const streamingService = {
  id: "01a18432-af59-73c1-8d06-a86e15104dd5",
  type: "page-type/page-type",
  slug: "streaming-service",
  definition: "a catalogue of shows and movies that people watch",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "streaming service" },
    { partOfSpeech: "part-of-speech/noun", spelling: "streaming services" },
  ],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/provider-names", required: true, many: true, maxCount: null },
    {
      pageProperty: "boolean-property/streaming-free",
      required: true,
      many: false,
      default: false,
    },
    {
      pageProperty: "boolean-property/streaming-held",
      required: true,
      many: false,
      default: false,
    },
    { pageProperty: "text-property/held-evidence", required: false, many: false },
    { pageProperty: "relation-property/streaming-merchant", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One page represents one catalogue, however many ways it is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An ad tier and an Amazon, Apple or Roku channel are spellings of what they carry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider name TMDB writes that no page lists yet gets a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether Alan holds a service is read from Monarch's charges or from Alan's word.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A service is not held on a guess.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "text-property/provider-names",
    "boolean-property/streaming-free",
    "boolean-property/streaming-held",
    "text-property/held-evidence",
    "relation-property/streaming-merchant",
  ],
  createdAt: "2026-10-28T20:27:56.630Z",
  updatedAt: "2026-10-30T15:26:35.619Z",
} as const satisfies PageType
