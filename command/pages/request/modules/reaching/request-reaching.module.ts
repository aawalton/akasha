import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestReaching = {
  id: "01a0c501-03d8-7c26-8ae6-7aec90409155",
  type: "page-type/module",
  slug: "request-reaching",
  definition: "the feature request a slug names and that request's standing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature request is reached by the slug that request declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The standing answered is what the page's own body says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page saying no standing is answered with none rather than with the default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug of no text is refused before any page is looked for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
