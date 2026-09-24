import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companions = {
  id: "01a06119-5caf-7f14-b426-f5ed8d06b488",
  type: "page-type/module",
  slug: "companions",
  definition: "every companion a player may take along, with the passive each one grants",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A companion's place in this table is the index a build hash has.",
    },
  ],
  hashIndexed: ["COMPANIONS_DATA"],
} as const satisfies Module
