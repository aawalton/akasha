import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const resolveAction = {
  id: "01a05bc6-fa4a-7009-9d91-eef4f7a1e89b",
  pageTypeSlug: "module",
  slug: "resolve-action",
  definition: "the outcome of one attack, worked out from attacker, defender and seed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fumble misses however far the score ran past the defence.",
    },
    {
      invariantKind: "departure",
      statement: "A critical hits however far the score fell short.",
    },
    {
      invariantKind: "departure",
      statement: "A hit takes at least a single point of damage.",
    },
    {
      invariantKind: "departure",
      statement: "A score falling less than three short still grazes.",
    },
    {
      invariantKind: "departure",
      statement: "Intent is held between zero and ten before intent counts.",
    },
  ],
} as const satisfies Module
