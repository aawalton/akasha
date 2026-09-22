import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDropNameNamesEn = {
  id: "01a061d6-3e27-7dcf-aff1-caab31397e85",
  type: "page-type/module",
  slug: "lib-sets-drop-name-names-en",
  definition: "the English name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here may be read from the game's own strings rather than written out.",
    },
  ],
} as const satisfies Module
