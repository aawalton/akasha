import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionMark = {
  id: "01a0fd30-312f-71cc-87ce-d7aef8502213",
  type: "page-type/module",
  slug: "completion-mark",
  definition: "the mark beside a page's title saying how far it is done",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page done is marked with a check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page read partway is marked with a ring filled as far as it is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page not begun is marked with an empty circle.",
    },
  ],
} as const satisfies Module
