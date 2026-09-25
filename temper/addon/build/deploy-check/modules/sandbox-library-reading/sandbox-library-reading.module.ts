import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sandboxLibraryReading = {
  id: "01a0d8b3-a671-7c01-8350-dea07853dd82", type: "page-type/module",
  slug: "sandbox-library-reading",
  definition: "the reading of the game's Lua sandbox out of the catalog add-on's saved variables",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sandbox is read out of the first account holding it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Names and members are sorted, so one capture writes the same body twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of the wrong kind is passed over rather than coerced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that will not parse, or holds no sandbox, reads as nothing.",
    },
  ],
} as const satisfies Module
