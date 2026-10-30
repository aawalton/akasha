import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const promptCancel = {
  id: "01a1840e-cfea-7d4a-9646-ebdb6b4abc7d",
  type: "page-type/module",
  slug: "prompt-cancel",
  definition:
    "how code finds on a seat's screen a prompt canceled before the agent writes anything",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A prompt taken back before any answer writes nothing more to the transcript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's screen says esc to interrupt near its bottom while the client works.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The screen is read only while the last prompt has nothing answering it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two quiet reads in a row with the transcript unchanged end the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen that cannot be read ends nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The watch runs in the seat's supervisor every three seconds.",
    },
  ],
  createdAt: "2026-10-28T19:48:45.674Z",
  updatedAt: "2026-10-30T14:41:29.497Z",
} as const satisfies Module
