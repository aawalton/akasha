import type { Module } from "@akasha/code-system/module"

export const readoutReading = {
  id: "01a057f9-873e-7390-9635-32012c10d149",
  pageTypeSlug: "module",
  slug: "readout-reading",
  definition: "the reading a readout last took, kept beside its page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A reading is kept in the file standing beside the readout the reading was taken for.",
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
      statement: "A reading replaces the one before it.",
    },
    {
      invariantKind: "departure",
      statement:
        "How old a reading may be and still be shown is stated once and read wherever one is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A readout with nothing standing beside it has taken no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading carrying one half alone is refused rather than read as no reading.",
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
