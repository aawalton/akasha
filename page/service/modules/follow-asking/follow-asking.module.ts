import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const followAsking = {
  id: "01a0e05d-fff9-7956-854a-13abc017cf91",
  type: "page-type/module",
  slug: "follow-asking",
  definition: "what a stream is asked to follow, read out of the body the follow was sent with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow names a key, a page type and the stream it is for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow names its pages by id or by slug with their values, or not at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One follow that is none of those refuses the whole ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask may name the epoch and mark it has every change up to, as `since`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `since` that is no such pair is passed over rather than refusing the ask.",
    },
  ],
} as const satisfies Module
