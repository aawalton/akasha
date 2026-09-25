import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const refusalTreeDrawing = {
  id: "01a0d943-723d-7d26-b8ff-fc7a0a3a3a50",
  type: "page-type/module",
  slug: "refusal-tree-drawing",
  definition: "the refusals picture drawn from the definitions the grammar refuses",
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
      decisionKind: "decision-kind/departure",
      statement: "The refusals counted are the refusals the picture on disk hangs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no picture is on disk the refusals are counted by judging.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
