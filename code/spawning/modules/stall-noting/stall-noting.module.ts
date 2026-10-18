import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stallNoting = {
  id: "01a14f7b-11c7-70b1-a94c-63b95d5171a1",
  type: "page-type/module",
  slug: "stall-noting",
  definition: "what each process in a run's group was doing when the clock ended that run",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run ended by the clock is noted just before it is ended, and no run else is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each process gives its state, what it waits in, its threads' states and command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process's kernel stack is noted where the kernel lets it be read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every read is best-effort, so a read that fails leaves its part out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Noting stops at a second or at 32 processes, and says how many it left unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Noting failing never keeps the run from being ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The note is read once and taken away, so it is answered to one run alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code noting is loaded only when a run is ended by the clock.",
    },
  ],
  createdAt: "2026-10-18T14:47:07.974Z",
  updatedAt: "2026-10-18T14:47:07.974Z",
} as const satisfies Module
