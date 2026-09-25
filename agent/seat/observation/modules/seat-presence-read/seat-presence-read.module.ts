import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatPresenceRead = {
  id: "01a06949-b281-7a43-b380-0b524b851f09",
  type: "page-type/module",
  slug: "seat-presence-read",
  definition: "whether a seat has an agent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent akasha has no seat page for is absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent whose seat names no readable process reads as unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent is present only where the process its seat names is still live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The agents akasha has a seat for are listed in sorted order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat a pid has is found by matching the pid in each seat's process key.",
    },
  ],
} as const satisfies Module
