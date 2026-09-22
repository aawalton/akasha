import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsClassify = {
  id: "01a0635f-391c-79c4-8464-429301bdaa3c",
  type: "page-type/module",
  slug: "quests-classify",
  definition: "what a dialogue option is, read from the code and the wording the game gave it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Wording marking persuasion or intimidation settles the option ahead of its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option whose code the game does not name here is plain talk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code the game offers a service under is a service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Persuasion the game has already refused is blocked rather than persuasion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One quest names a branch chosen by wording rather than by the option's code.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "That branch is read only while the quest naming the branch is in the journal.",
    },
  ],
} as const satisfies Module
