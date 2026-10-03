import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnHolding = {
  id: "01a10262-bbed-7358-b397-4bb8a771e1a0",
  type: "page-type/module",
  slug: "turn-holding",
  definition: "what a turn or written chapter's page says of which step it is at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that is part of no played or written story is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no step status is refused.",
    },
  ],
} as const satisfies Module
