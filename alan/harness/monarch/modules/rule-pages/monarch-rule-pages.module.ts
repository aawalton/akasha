import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRulePages = {
  id: "01a06865-ecc3-732a-af06-7eaca3662b5c",
  type: "page-type/module",
  slug: "monarch-rule-pages",
  definition: "the category pages a rule names, and a rule tool's flags",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is reached by its page's slug rather than by Monarch's own id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug that names no existing category is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A merged or renamed category is loud.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category page with no Monarch id is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category named in words resolves only where exactly one page has that title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount sign is positive or negative or nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other word is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value coming before any flag that value could belong to is refused rather than guessed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag may be given several times and has every value given.",
    },
  ],
} as const satisfies Module
