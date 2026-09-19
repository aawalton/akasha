import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const placeReading = {
  id: "01a0b8af-d1b4-7dd0-956c-5529d1ad14cd",
  type: "page-type/module",
  slug: "place-reading",
  definition: "the places a name is held to, as the index states them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "The places hold for the whole repo.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages carrying `luaExport` are asked of the index rather than named here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a body or judges a name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The file properties carrying `fixedExport` are asked of the index rather than named here.",
    },
  ],
} as const satisfies Module
