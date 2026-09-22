import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsEntry = {
  id: "01a0635f-391c-75b0-b95a-d199d158f50a",
  type: "page-type/module",
  slug: "quests-entry",
  definition: "the order the quests feature's parts are set going in once the add-on has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is set going before the game says the add-on has loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved variables are reached before any other part of the feature runs.",
    },
  ],
} as const satisfies Module
