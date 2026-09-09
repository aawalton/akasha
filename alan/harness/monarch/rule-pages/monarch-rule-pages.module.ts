import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRulePages = {
  id: "01a06865-ecc3-732a-af06-7eaca3662b5c",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-rule-pages",
  definition: "the category pages a rule names, and the flags a rule tool is called with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category is reached by its page's slug rather than by Monarch's own id.",
    },
    {
      invariantKind: "departure",
      statement: "A slug that names no existing category is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A merged or renamed category is loud.",
    },
    {
      invariantKind: "departure",
      statement: "A category page with no Monarch id is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A category named in words resolves only where exactly one page has that title.",
    },
    {
      invariantKind: "departure",
      statement: "An amount sign is positive or negative or nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Any other word is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value coming before any flag that value could belong to is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "A flag may be given several times and has every value given.",
    },
  ],
} as const satisfies Module
