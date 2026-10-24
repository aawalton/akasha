import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const couplesCall = {
  id: "01a16fae-6058-7358-ac29-7067f314d048",
  type: "page-type/domain",
  slug: "couples-call",
  definition: "a phone call Alan and Jenny hold with a live-model therapist",
  parts: ["module/couples-call-audio", "module/couples-call-brief", "module/couples-call-room"],
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The live model is the therapist on a call, to test whether a call is worth having.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each spouse calls the agent number from their own phone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which leg the sound came in on says which spouse is speaking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Telnyx carries the call and Gemini Live is the therapist's ears, mind and mouth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The agent number's calls reach this app through the Telnyx application couples-call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing said on a call is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One call is held at a time.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The Telnyx API key is held on the outbound account and again as an alanwalton-web secret.",
    },
  ],
  createdAt: "2026-10-24T20:51:01.335Z",
  updatedAt: "2026-10-24T21:23:53.763Z",
} as const satisfies Domain
