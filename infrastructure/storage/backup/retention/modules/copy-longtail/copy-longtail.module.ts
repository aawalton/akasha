import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const copyLongtail = {
  id: "01a06863-b0ae-7ca1-800b-d4bd20dd7345",
  type: "page-type/module",
  slug: "copy-longtail",
  definition: "one run bringing the slower store to the units the monthly windows say",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The hasher is proved on bytes of a known hash before any unit is copied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A unit is complete only once a marker naming the unit's contents is written into that unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit already complete is passed over rather than copied again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run past its share of the disk reports that even where the copies went well.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing the module starts nothing.",
    },
  ],
} as const satisfies Module
