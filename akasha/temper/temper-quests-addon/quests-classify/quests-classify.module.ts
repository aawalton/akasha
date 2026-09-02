import type { Module } from "@akasha/code-system/module"

export const questsClassify = {
  id: "01a0635f-391c-79c4-8464-429301bdaa3c",
  pageTypeSlug: "module",
  slug: "quests-classify",
  definition: "what one dialogue option is, read from the code and the wording the game gave it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Wording marking persuasion or intimidation settles the option ahead of its code.",
    },
    {
      invariantKind: "departure",
      statement: "An option whose code the game does not name here is plain talk.",
    },
    {
      invariantKind: "departure",
      statement: "A code the game offers a service under is a service.",
    },
    {
      invariantKind: "departure",
      statement: "Persuasion the game has already refused is blocked rather than persuasion.",
    },
    {
      invariantKind: "departure",
      statement: "One quest names a branch chosen by wording rather than by the option's code.",
    },
    {
      invariantKind: "constraint",
      statement: "That branch is read only while the quest naming the branch is in the journal.",
    },
  ],
} as const satisfies Module
