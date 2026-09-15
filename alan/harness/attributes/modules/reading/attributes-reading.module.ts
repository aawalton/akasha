import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const attributesReading = {
  id: "01a069bc-1aa3-790c-bb5e-db2397ad19ed",
  type: "module",
  slug: "attributes-reading",
  definition: "the six attribute points Alan earned today, read and kept on their own readouts",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readings are taken on the workstation with the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each reading is kept beside the readout that reading was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Each reading is kept beside its attribute's page as that attribute's points today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The attribute a readout counts is read off that readout's own link.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That link reads back as the slug alone, whatever page type names it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The question to ask and how to read each answer are on each readout's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stretch keys are spelled back to the store's own spelling for the guard.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The guard reading each attribute is akasha's own and is unchanged here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The plants the constitution counts are asked for through the plants reading module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A source's throws are carried by that source's promise rather than raised at the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A source that could not be read is named on stderr with the reason that source gave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A day nobody has opened yet is an absent reading rather than an unreachable source.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each readout is named as soon as that readout's reading is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute's points today are named as soon as those points are kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading kept is named before the points that reading writes, which can throw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that kept a reading exits 0.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that kept no reading exits 2.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of this file takes the six readings.",
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
      invariantKind: "invariant-kind/stopgap",
      statement: "Each readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The points themselves are never printed.",
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
