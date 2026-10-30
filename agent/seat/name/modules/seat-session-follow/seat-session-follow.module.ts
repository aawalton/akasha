import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatSessionFollow = {
  id: "01a16f9d-cd53-7704-b202-e501e9dfd98e",
  type: "page-type/module",
  slug: "seat-session-follow",
  definition:
    "how a supervisor gives the name of its seat to the tmux session the supervisor runs in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The supervisor of a seat renames the tmux session it runs in to the seat's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The session is the one whose pane runs the supervisor, found by its processes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session holding more than one pane is never renamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rename is tried once for each name the seat takes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here stops or restarts the agent in the seat.",
    },
  ],
  createdAt: "2026-10-24T20:32:55.123Z",
  updatedAt: "2026-10-30T14:57:06.102Z",
} as const satisfies Module
