import type { Module } from "../../code-system/modules/module.page-type.ts"

export const lastMessaged = {
  id: "01a05b70-a58c-7e12-b45f-7ec257ec247d",
  pageTypeSlug: "module",
  slug: "last-messaged",
  definition: "which persona an agent's stated persona or its own name points at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The stated persona is tried before the agent's name.",
    },
    {
      invariantKind: "departure",
      statement: "Both sides are lowercased and spaced with dashes before both sides are compared.",
    },
  ],
} as const satisfies Module
