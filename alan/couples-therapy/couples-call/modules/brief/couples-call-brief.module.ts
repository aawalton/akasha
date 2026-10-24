import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const couplesCallBrief = {
  id: "01a16fae-6059-7c60-ba89-e98c42e72418",
  type: "page-type/module",
  slug: "couples-call-brief",
  definition: "what the live-model therapist on a couples call is told",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The brief is read from the pages when a call opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Those pages are couples-therapy, couples-therapist, Claudius and the alan-and-jenny book.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the domain's constraints and absences reach the brief.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directive about the recorder is left out, since a call has none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the brief says of the call itself is stated here rather than on any page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The therapist speaks in Claudius's live voice.",
    },
  ],
  createdAt: "2026-10-24T20:51:01.335Z",
  updatedAt: "2026-10-24T20:51:01.335Z",
} as const satisfies Module
