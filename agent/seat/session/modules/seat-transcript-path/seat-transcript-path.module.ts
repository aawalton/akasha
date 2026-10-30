import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTranscriptPath = {
  id: "01a06949-b281-7c83-952b-22f6213b7460",
  type: "page-type/module",
  slug: "seat-transcript-path",
  definition: "the path of the transcript of a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The record beside the page is read before the page's own value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is taken as given with no check on its shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty text is no transcript path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Neither a record nor a page value leaves a seat with no transcript.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.641Z",
  updatedAt: "2026-10-30T14:47:40.595Z",
} as const satisfies Module
