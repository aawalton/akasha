import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const attentionNotifyWatch = {
  id: "01a183e4-11f8-75e1-84e6-3da7555edc65",
  type: "page-type/module",
  slug: "attention-notify-watch",
  definition: "a persona seat turning red or yellow shown on the desktop",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn ending red is shown at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn ending yellow is shown once the needs-attention judge has had time to end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is shown at most once in each color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The state a supervisor first finds is not shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Blue, purple and stopped are never shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notification is titled with the seat's persona and carries the reply's opening.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The watch runs every three seconds rather than on the heartbeat.",
    },
  ],
  createdAt: "2026-10-28T19:02:04.535Z",
  updatedAt: "2026-10-28T19:02:04.535Z",
} as const satisfies Module
