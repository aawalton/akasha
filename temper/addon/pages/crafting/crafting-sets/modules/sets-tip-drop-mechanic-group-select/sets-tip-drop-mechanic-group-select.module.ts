import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipDropMechanicGroupSelect = {
  id: "01a06231-8f1e-710c-b8c6-91c1c5518292",
  type: "page-type/module",
  slug: "sets-tip-drop-mechanic-group-select",
  definition: "picking the distinct members of a zone group in index order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A member with neither a mechanic name nor a location name is left out.",
    },
  ],
} as const satisfies Module
