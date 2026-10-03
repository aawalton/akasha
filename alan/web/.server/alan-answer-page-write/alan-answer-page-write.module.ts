import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanAnswerPageWrite = {
  id: "01a0655e-d399-7645-8aef-dc15eae745ee",
  type: "page-type/module",
  slug: "alan-answer-page-write",
  definition: "a page write taken from Alan's browser and carried to the store",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A write reading a written chapter runs its story's word backlog rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer to that write does not wait on the rule.",
    },
  ],
} as const satisfies Module
