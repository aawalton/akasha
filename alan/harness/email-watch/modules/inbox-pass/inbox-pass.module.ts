import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxPass = {
  id: "01a06948-c4c6-798a-a36f-1d22dd231125",
  type: "page-type/module",
  slug: "inbox-pass",
  definition: "a pass over a person's inbox that writes what the pass does",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pass names the person whose inbox that pass reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming no person reads Alan's inbox.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag where a person's name was asked for is no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every decision a run made is said before the tally.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tally counts the messages examined and acted on and waiting and unclaimed and discarded.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says the action a rule takes on a message.",
    },
  ],
  createdAt: "2026-09-03T21:59:31.782Z",
  updatedAt: "2026-10-30T15:31:58.282Z",
} as const satisfies Module
