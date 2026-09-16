import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutAsking = {
  id: "01a061c0-e7cc-7ec9-b512-033fcde733e7",
  type: "page-type/module",
  slug: "readout-asking",
  definition: "the asking a readout reaches the store through",
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
} as const satisfies Module
