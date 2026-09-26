import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSetData = {
  id: "01a0de03-2162-746f-bbae-63db49ec4d4b",
  type: "page-type/module",
  slug: "sets-set-data",
  definition: "each set's item ids, names and piece types, and which zones are dungeons",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The table is worked out from the set and zone pages, which the compiler writes in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set is filed here only where its page states its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot or weight is filed under the game constant the set's page names it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set has jewelry where its pieces fill a neck or ring slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone is a dungeon where its zone page files it as a dungeon, trial or arena.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone is a public dungeon where a public dungeon page names it.",
    },
  ],
} as const satisfies Module
