import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const attributesReading = {
  id: "01a069bc-1aa3-790c-bb5e-db2397ad19ed",
  pageTypeSlug: "module",
  type: "module",
  slug: "attributes-reading",
  definition: "the six attribute points Alan earned today, read and kept on their own readouts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The readings are taken on the workstation with the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Each reading is kept beside the readout that reading was taken for.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each reading is kept beside its attribute's page as that attribute's points today.",
    },
    {
      invariantKind: "departure",
      statement: "The attribute a readout counts is read off that readout's own link.",
    },
    {
      invariantKind: "departure",
      statement: "The question to ask and how to read each answer are on each readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The stretch keys are spelled back to the store's own spelling for the guard.",
    },
    {
      invariantKind: "departure",
      statement: "The guard reading each attribute is akasha's own and is unchanged here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The plants the constitution counts are asked for through the plants reading module.",
    },
    {
      invariantKind: "departure",
      statement:
        "A source's throws are carried by that source's promise rather than raised at the call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A source that could not be read is named on stderr with the reason that source gave.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day nobody has opened yet is an absent reading rather than an unreachable source.",
    },
    {
      invariantKind: "departure",
      statement: "A run that kept a reading exits 0.",
    },
    {
      invariantKind: "departure",
      statement: "A run that kept no reading exits 2.",
    },
    {
      invariantKind: "departure",
      statement: "A run of this file takes the six readings.",
    },
    {
      invariantKind: "departure",
      statement:
        "The root read is the root the environment states or the folder the call was made in.",
    },
    {
      invariantKind: "stopgap",
      statement: "Each readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "absence",
      statement: "The points themselves are never printed.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes no reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
