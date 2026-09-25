import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersScribingSourceMotifStyles = {
  id: "01a0d8b0-d2b7-7212-b8f6-937434822355",
  type: "page-type/module",
  slug: "characters-scribing-source-motif-styles",
  definition: "the motif styles a scribing source drops, carried into the add-on from their pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every motif style page naming a scribing source in its drop sources is imported here, and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages are imported whole, so the add-on reads a style's drop sources from its page.",
    },
  ],
} as const satisfies Module
