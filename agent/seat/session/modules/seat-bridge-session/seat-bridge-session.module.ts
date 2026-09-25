import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatBridgeSession = {
  id: "01a0d900-0f71-7159-9a2e-756c4af02fda",
  type: "page-type/module",
  slug: "seat-bridge-session",
  definition: "the claude.ai session a seat's agent is reached through, read off its transcript",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat supervisor writes the session beside the seat on every heartbeat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The session is the one the last bridge record in the transcript names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the end of the transcript is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session is written as claude.ai names it in a link rather than as the transcript does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session already beside the seat is not written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript naming no session leaves what is beside the seat as it is.",
    },
  ],
} as const satisfies Module
