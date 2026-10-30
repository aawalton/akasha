import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const refusalTreeDrawing = {
  id: "01a0d943-723d-7d26-b8ff-fc7a0a3a3a50",
  type: "page-type/module",
  slug: "refusal-tree-drawing",
  definition:
    "how code arranges every refusal of a definition under the page that has the definition",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is judged by the grammar check over the committed pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal hangs under the page whose definition is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is drawn as the reason the grammar check gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal opens the page whose definition is refused.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
  createdAt: "2026-09-25T15:51:11.165Z",
  updatedAt: "2026-10-30T15:35:42.170Z",
} as const satisfies Module
