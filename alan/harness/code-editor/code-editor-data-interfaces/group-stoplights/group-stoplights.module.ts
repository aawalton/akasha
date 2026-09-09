import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const groupStoplights = {
  id: "01a064e4-627c-717e-bcf8-2ad1f41c1222",
  pageTypeSlug: "module",
  type: "module",
  slug: "group-stoplights",
  definition: "the glyph row and the legend a set of stoplights is drawn as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The glyph row and the legend are two drawings of one set of stoplights.",
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
      statement: "Nothing here reaches the store.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
  ],
} as const satisfies Module
