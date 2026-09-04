import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const safetyReading = {
  id: "01a069bc-9375-7eee-b662-6f844c8880b6",
  pageTypeSlug: "module",
  slug: "safety-reading",
  definition:
    "the safety level Alan logged, taken from his open block and kept on the safety readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation carrying the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The level is kept beside the readout the level was taken for.",
    },
    {
      invariantKind: "departure",
      statement: "The session row is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A session beside a day moved into akasha is read from akasha.",
    },
    {
      invariantKind: "departure",
      statement: "What to ask and how to read the answer are on the readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The open session comes from `openSession` rather than from a query written here.",
    },
    {
      invariantKind: "departure",
      statement: "A `session-tracking` row is read out of a sidecar beside a day page.",
    },
    {
      invariantKind: "departure",
      statement: "The `daily-tracking` file list names the markdown half and the akasha half.",
    },
    {
      invariantKind: "constraint",
      statement: "A query for an empty end-time reaches the markdown half and the akasha half.",
    },
    {
      invariantKind: "constraint",
      statement: "A session opened before its day moved and closed after is answered by two rows.",
    },
    {
      invariantKind: "gap",
      statement:
        "Newest-first over `start-time` does not choose between a pre-move row and a post-move row.",
    },
    {
      invariantKind: "departure",
      statement: "Choosing between a pre-move row and a post-move row belongs to `openSession`.",
    },
    {
      invariantKind: "departure",
      statement: "`levelIn` is akasha's own guard.",
    },
    {
      invariantKind: "departure",
      statement: "`levelIn` is carried unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "No open session is no reading.",
    },
    {
      invariantKind: "departure",
      statement: "An open session carrying no level is no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A level spelling no number is no reading rather than a level of zero.",
    },
    {
      invariantKind: "departure",
      statement: "`openSession` answers a row whose keys are camelized.",
    },
    {
      invariantKind: "departure",
      statement: "`levelIn` reads the spelling the store keeps.",
    },
    {
      invariantKind: "departure",
      statement: "The one key `levelIn` reads is spelled back to kebab here.",
    },
    {
      invariantKind: "departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "departure",
      statement: "The root read is the one the environment states or the one the call was made in.",
    },
    {
      invariantKind: "stopgap",
      statement: "The readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "absence",
      statement: "The level itself is never printed.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
