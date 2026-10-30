import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutAsking = {
  id: "01a061c0-e7cc-7ec9-b512-033fcde733e7",
  type: "page-type/module",
  slug: "readout-asking",
  definition: "how a readout asks the store for rows",
  code: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout is handed its asking rather than holding an asking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer is a refusal or rows rather than rows that may be missing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a value out of a row.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a readout.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a page type.",
    },
  ],
  createdAt: "2026-09-02T10:53:47.340Z",
  updatedAt: "2026-10-30T16:02:18.974Z",
} as const satisfies Module
