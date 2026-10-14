import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureSetMap = {
  id: "01a0616b-ac58-72db-b5be-6386f22d086e",
  type: "page-type/module",
  slug: "character-capture-set-map",
  definition: "each gear set's game id against its place in a build hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The places are read from the set pages as the add-on compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place written here decodes to the set with the same game id.",
    },
  ],
  createdAt: "2026-09-02T09:20:41.560Z",
  updatedAt: "2026-10-14T13:38:45.534Z",
} as const satisfies Module
