import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const haremHotelDerivedBeside = {
  id: "01a0de74-5fb3-7e65-8670-7ee66796c341",
  type: "page-type/module",
  slug: "harem-hotel-derived-beside",
  definition: "the derived numbers a Harem Hotel character's sheet shows, each with its formula",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every derived number the Harem Hotel has is listed here with the formula working it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A derived number is named by its page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbers are listed in the order the sheet shows them.",
    },
  ],
} as const satisfies Module
