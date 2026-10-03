import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnEditing = {
  id: "01a10376-8f87-7b0b-9e68-2200e2285399",
  type: "page-type/module",
  slug: "turn-editing",
  definition: "which editor step a written chapter of a story with editor steps goes to next",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a written chapter of a story stating editor steps goes to an editor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's first beats go to beat-editor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's mend of beats a chapter already holds goes on past beat-editor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer's prose goes to prose-editor, every time the writer writes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An editor's advance goes on as the step before it would with no editor.",
    },
  ],
} as const satisfies Module
