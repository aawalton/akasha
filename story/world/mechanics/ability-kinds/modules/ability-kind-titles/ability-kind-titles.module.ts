import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const abilityKindTitles = {
  id: "01a18003-61ae-7e38-8a77-8a41d2b29206",
  type: "page-type/module",
  slug: "ability-kind-titles",
  definition: "the title of the ability kind each world skill is of, by the skill's title",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is named to its kind by the skill's own title, as a window names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title two skills of different kinds share is named to no kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill naming no ability kind is named to no kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is slotted where the kind it names states its active slots.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
  createdAt: "2026-10-28T00:57:47.694Z",
  updatedAt: "2026-10-28T14:00:14.652Z",
} as const satisfies Module
