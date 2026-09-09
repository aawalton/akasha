import type { Module } from "@akasha/code/module"

export const readoutReading = {
  id: "01a057f9-873e-7390-9635-32012c10d149",
  pageTypeSlug: "module",
  type: "module",
  slug: "readout-reading",
  definition: "the reading a readout last took, kept beside its page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading is kept in the file beside the readout the reading was taken for.",
    },
    {
      invariantKind: "departure",
      statement: "A reading never reaches the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The file a reading is kept in never leaves the machine that took the reading.",
    },
    {
      invariantKind: "departure",
      statement: "The moment a reading was taken is kept beside its value.",
    },
    {
      invariantKind: "departure",
      statement: "A reading replaces the reading before that reading.",
    },
    {
      invariantKind: "departure",
      statement: "The age a reading may reach and still be shown is stated here alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The age a reading may reach and still be shown is read wherever a reading is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A readout with nothing beside that readout has taken no reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading in the file with one half alone is refused rather than read as no reading.",
    },
    {
      invariantKind: "departure",
      statement: "The reading a readout carries is read off the readout's own values.",
    },
    {
      invariantKind: "departure",
      statement: "The two halves a reading is carried under are named here alone.",
    },
    {
      invariantKind: "departure",
      statement: "Values with neither half have no reading.",
    },
    {
      invariantKind: "departure",
      statement: "Values with one half alone have no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is the number a readout is given to show.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
