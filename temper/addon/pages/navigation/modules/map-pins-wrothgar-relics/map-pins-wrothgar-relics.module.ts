import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsWrothgarRelics = {
  id: "01a06269-2b0e-7f24-9349-1f8a948fdcad",
  type: "page-type/module",
  slug: "map-pins-wrothgar-relics",
  definition: "the Wrothgar relic places",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
