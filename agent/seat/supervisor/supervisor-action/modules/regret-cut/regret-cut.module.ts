import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const regretCut = {
  id: "01a16fe1-4cd9-7640-8946-6f919c2c593c",
  type: "page-type/module",
  slug: "regret-cut",
  definition: "how code finds where a seat's transcript is cut to take a person's message back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript is cut just before the first line carrying the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line carries a message where it queues, injects or says that message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is taken back only where it reached the seat between turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message folded into a running turn is refused, since a cut takes that turn's later work too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message whose reply ended is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message anything else was said after is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An interruption ends the reply rather than saying anything after the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message the transcript holds nowhere since its last compaction is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript is read from its last compaction, where no turn is running.",
    },
  ],
  createdAt: "2026-10-24T21:46:38.681Z",
  updatedAt: "2026-10-24T22:00:07.098Z",
} as const satisfies Module
