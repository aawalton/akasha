import type { Module } from "../../code-system/module/module.page-type.ts"

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
      statement: "A reading is kept in the file standing beside the readout it was taken for.",
    },
    {
      invariantKind: "departure",
      statement: "A reading never reaches the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A reading never leaves the machine that took it.",
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
      statement: "A readout with nothing standing beside it has taken no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading carrying one of its halves alone is refused rather than read as none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when one is due.",
    },
  ],
} as const satisfies Module
