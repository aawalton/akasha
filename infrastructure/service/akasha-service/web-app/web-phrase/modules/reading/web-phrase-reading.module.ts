import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webPhraseReading = {
  id: "01a0e2d2-7261-77ec-81de-3ece62418f84",
  type: "page-type/module",
  slug: "web-phrase-reading",
  definition: "the web phrases a screen shows, read live from their pages",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase is drawn again as soon as its page changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Until the live pages are read, a phrase is drawn from the phrases the root's loader read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase neither read is drawn as nothing rather than as wording in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A site with no page store says only the loader's phrases, which follow their pages.",
    },
  ],
} as const satisfies Module
