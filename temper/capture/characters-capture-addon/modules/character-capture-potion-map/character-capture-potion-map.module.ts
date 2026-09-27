import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCapturePotionMap = {
  id: "01a0616b-4d67-7eae-a7e9-5dba894d679f",
  type: "page-type/module",
  slug: "character-capture-potion-map",
  definition: "each potion's item id and packed effects against its place in a build hash",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A potion's place is compiled in from the potion pages as the add-on compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crown or dropped potion is known by its item id, and a brewed one by its traits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A potion no page states takes the no-potion page's place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What each potion restores is compiled in from the potion pages as well.",
    },
  ],
} as const satisfies Module
