import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const forwardedMessage = {
  id: "01a0657c-604c-7002-a940-7c5975e0d53e",
  type: "page-type/module",
  slug: "forwarded-message",
  definition: "the bytes of an email wrapped as a forward of itself",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A forward is made of an attribution part and the original's body part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A boundary appearing anywhere in the original is minted again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The original is taken as latin1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header folded over several lines is taken as a single header.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The original's content headers are carried onto the body part.",
    },
  ],
} as const satisfies Module
