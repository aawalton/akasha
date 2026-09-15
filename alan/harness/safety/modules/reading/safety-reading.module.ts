import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const safetyReading = {
  id: "01a069bc-9375-7eee-b662-6f844c8880b6",
  type: "module",
  slug: "safety-reading",
  definition:
    "the safety level Alan logged, taken from his open block and kept on the safety readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The level is kept beside the readout the level was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The session row is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session beside a day moved into akasha is read from akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How to read the answer is on the readout's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The open session comes from `openSession` rather than from a query written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `session-tracking` row is read out of a sidecar beside a day page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The `daily-tracking` file list names the markdown half and the akasha half.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A query for an empty end-time reaches the markdown half and the akasha half.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A session opened before its day moved and closed after is answered by two rows.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "Newest-first over `start-time` does not choose between a pre-move row and a post-move row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Choosing between a pre-move row and a post-move row belongs to `openSession`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`levelIn` is akasha's own guard.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`levelIn` is carried unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No open session is no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An open session with no level is no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level spelling no number is no reading rather than a level of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`openSession` answers a row whose keys are camelized.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`levelIn` reads the spelling the store keeps.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The one key `levelIn` reads is spelled back to kebab here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The root read is the root the environment states or the folder the call was made in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty value in the environment states no root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the readout's page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The level itself is never printed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
