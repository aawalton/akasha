import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropNameNamesEn = {
  id: "01a061d6-3e27-7dcf-aff1-caab31397e85",
  type: "page-type/module",
  slug: "sets-drop-name-names-en",
  definition: "the English name of each way a gear set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here may be read from the game's own strings rather than written out.",
    },
  ],
  createdAt: "2026-09-02T11:17:05.703Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
