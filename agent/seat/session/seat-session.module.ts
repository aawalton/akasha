import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatSession = {
  id: "01a06949-b281-709f-96f4-45790933cf1e",
  type: "page-type/module",
  slug: "seat-session",
  definition: "the Claude Code session of a seat and its transcript",
  parts: [
    "module/seat-bridge-session",
    "module/seat-session-resolve",
    "module/seat-transcript-path",
    "module/seat-transcript-rotation",
  ],
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's session is read off its page rather than beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a resume reads a session out of history, and only for a seat whose page has gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose page is there and states no session has none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value shaped as anything but a uuid is no session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session cannot be observed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is committed with the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Keeping a session does nothing.",
    },
  ],
  updatedAt: "2026-10-30T14:46:12.672Z",
  createdAt: "2026-09-03T22:00:32.641Z",
} as const satisfies Module
