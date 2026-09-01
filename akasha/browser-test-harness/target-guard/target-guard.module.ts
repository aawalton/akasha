import type { Module } from "@akasha/code-system/module"

export const targetGuard = {
  id: "01a05ca9-d804-71ee-aeea-ce444d2f6275",
  pageTypeSlug: "module",
  slug: "target-guard",
  definition: "the warning that a deployed target does not carry this branch's commits",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A localhost target is never warned about.",
    },
  ],
} as const satisfies Module
