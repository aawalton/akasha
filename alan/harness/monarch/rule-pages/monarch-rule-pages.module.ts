import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRulePages = {
  id: "01a06865-ecc3-732a-af06-7eaca3662b5c",
  pageTypeSlug: "module",
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
      statement:
        "A slug that names no standing category is refused, so a merged or renamed category is loud.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category page carrying no Monarch id is refused, because nothing could be posted back for it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category named in words resolves only where exactly one page carries that title.",
    },
    {
      invariantKind: "departure",
      statement: "An amount sign is positive, negative or nothing, and any other word is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value standing before any flag it could belong to is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "A flag may be given several times and holds every value given.",
    },
  ],
} as const satisfies Module
