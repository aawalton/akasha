import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lrclibClient = {
  id: "01a06262-ff4c-7004-99a6-b15f63fddbd0",
  type: "page-type/module",
  slug: "lrclib-client",
  definition: "how code asks LRCLIB for the words of a song",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "LRCLIB is asked no more than once every 250 milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One queue has every ask this module makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The queue is per process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask that fails waits as long as an ask that answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song is asked for by its title and its artist's name together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer that is no 200 is thrown rather than returned.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No test here reaches LRCLIB.",
    },
  ],
  createdAt: "2026-09-02T13:50:50.188Z",
  updatedAt: "2026-10-30T16:18:36.320Z",
} as const satisfies Module
