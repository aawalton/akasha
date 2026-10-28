import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const heldAbilitySetting = {
  id: "01a17fff-e228-73bd-b818-5444d87aa892",
  type: "page-type/module",
  slug: "held-ability-setting",
  definition:
    "a held ability of a played story's player set aside or taken up again from the sheet",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Setting an ability aside or taking it up makes no turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change lands as one beat added to the latest turn, and on the ability's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The beat and the page land in one commit, read at the commit the turn was read at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change while the latest turn is being made is refused, as an action is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an ability held by the character playing the named story is changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What the change is, or why it is refused, is the ability-slotting module's answer.",
    },
  ],
  createdAt: "2026-10-28T00:53:58.439Z",
  updatedAt: "2026-10-28T00:53:58.439Z",
} as const satisfies Module
