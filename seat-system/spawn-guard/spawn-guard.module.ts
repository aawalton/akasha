import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const spawnGuard = {
  id: "01a0695a-d2ea-7bcd-b07f-19486629a01c",
  pageTypeSlug: "module",
  slug: "spawn-guard",
  definition: "whether a name may be spawned into, by whether anything has it and can be seen",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal names this module by its slug rather than by its path.",
    },
  ],
} as const satisfies Module
