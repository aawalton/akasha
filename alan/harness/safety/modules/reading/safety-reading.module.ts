import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const safetyReading = {
  id: "01a069bc-9375-7eee-b662-6f844c8880b6",
  type: "page-type/module",
  slug: "safety-reading",
  definition:
    "the safety level Alan logged, taken from his open block and kept on the safety readout",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The level is kept beside the readout the level was taken for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The session row is reached through the one module saying where a day is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session beside a day moved into akasha is read from akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How to read the answer is on the readout's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The open session comes from `openSession` rather than from a query written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `session-tracking` row is read out of a sidecar beside a day page.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "`levelIn` is akasha's own guard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`levelIn` is carried unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No open session is no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An open session with no level is no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level spelling no number is no reading rather than a level of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`openSession` answers a row whose keys are camelized.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`levelIn` reads the spelling the store keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The one key `levelIn` reads is spelled back to kebab here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The root read is the root the environment states or the folder the call was made in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty value in the environment states no root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readout is the one whose page names this module as serving it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The level itself is never printed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
