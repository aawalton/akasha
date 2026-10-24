import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatReplyNotifying = {
  id: "01a16f80-7143-783f-ba97-16653fa64c74",
  type: "page-type/domain",
  slug: "seat-reply-notifying",
  definition: "a seat's reply pushed to the persons the seat answers to",
  parts: ["module/reply-notify-poll"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reply of a seat answering to several persons is pushed to each of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat answering to one person pushes no reply.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a seat started interactive pushes a reply.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A headless seat pushes no reply.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply is pushed by the seat's supervisor rather than by a hook at the stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply is pushed on the first heartbeat after the turn ends.",
    },
  ],
  createdAt: "2026-10-24T20:00:51.010Z",
  updatedAt: "2026-10-24T20:00:51.010Z",
} as const satisfies Domain
