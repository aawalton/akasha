import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingMyHouses = {
  id: "01a06128-d5d0-7837-b130-e565c12035cb",
  type: "page-type/module",
  slug: "housing-my-houses",
  definition: "drawing a row for each house this account has bought",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bought house may be ported to inside or at the front door.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.264Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
