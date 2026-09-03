import type { Module } from "../../code-system/modules/module.page-type.ts"

export const groupStoplights = {
  id: "01a064e4-627c-717e-bcf8-2ad1f41c1222",
  pageTypeSlug: "module",
  slug: "group-stoplights",
  definition: "the glyph row and the legend a readout group's stoplights are read as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group is read once for the glyph row and the legend together.",
    },
    {
      invariantKind: "departure",
      statement: "The glyph row and the legend are two readings of one set of stoplights.",
    },
    {
      invariantKind: "departure",
      statement: "The glyph row takes each stoplight's tier and the legend takes each label.",
    },
    {
      invariantKind: "departure",
      statement: "A legend parts one label from the next with a spaced middle dot.",
    },
    {
      invariantKind: "departure",
      statement: "Each tier has one glyph named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The store this workstation runs is named only where the environment names no origin.",
    },
    {
      invariantKind: "departure",
      statement: "The name a pod reaches the store by resolves to nothing on this workstation.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is taken off the readout's own row rather than relayed in from a pod.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names which readouts a group holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the label a readout carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the scale a reading is read against.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here needs a credential.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches past the store this workstation runs.",
    },
  ],
} as const satisfies Module
