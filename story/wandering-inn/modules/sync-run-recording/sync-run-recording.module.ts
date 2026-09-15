import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const syncRunRecording = {
  id: "01a0686c-fd2c-7002-a269-4f47fac2fd46",
  type: "page-type/module",
  slug: "sync-run-recording",
  definition: "a sync run opened, settled and recorded against the sync it ran for",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is a row among the sync's own runs rather than a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is recorded as running before the sync that run records is started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that threw is recorded as failed and the throw carries on outward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run terminated by a signal is recorded as failed before the process ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run left open longer than seven hours by a process that died is closed as failed by the next run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that failed an item is a failed run however much else the run filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record that will not land is said on the console rather than failing the sync it records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change adding a file lands the record rather than an edit composed here.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Run recording is reached by the wandering inn sync alone.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The great courses and royal road syncs record no run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run states the id that run keeps.",
    },
  ],
} as const satisfies Module
