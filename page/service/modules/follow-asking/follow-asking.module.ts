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
  ],
} as const satisfies Module
