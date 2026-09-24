import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workTreeComposing = {
  id: "01a0d442-62f1-7bef-820b-44a1b1ae0846",
  type: "page-type/module",
  slug: "work-tree-composing",
  definition: "each initiative drawn under the one above it, and the intents it has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is composed at the moment of asking rather than read from a store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An initiative is keyed by the slug the initiative declares rather than by the file name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An initiative whose parent is not there is drawn as a root and stays in the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An initiative whose parent chain closes into a cycle is drawn as a root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The intents an initiative has are drawn beneath that initiative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent keeps the place its initiative states rather than being sorted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The intents come ahead of the initiatives beneath.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent is keyed by its initiative's slug and its place in that list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent opens the page of the initiative with that intent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An intent has its working memory as its note.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row says whether the row is an initiative or an intent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The colors are read from the seat pages alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An intent has no color.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An initiative no seat sits on has no color.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An intent leads nowhere.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
