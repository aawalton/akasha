import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanAnswerPageWrite = {
  id: "01a0655e-d399-7645-8aef-dc15eae745ee",
  type: "page-type/module",
  slug: "alan-answer-page-write",
  definition: "how alanwalton.com carries the page a browser writes to the page store",
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
  createdAt: "2026-09-03T03:45:08.505Z",
  updatedAt: "2026-10-30T16:56:10.896Z",
} as const satisfies Module
