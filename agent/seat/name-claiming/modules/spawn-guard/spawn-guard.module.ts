import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spawnGuard = {
  id: "01a0695a-d2ea-7bcd-b07f-19486629a01c",
  type: "module",
  slug: "spawn-guard",
  definition: "whether a name may be spawned into, by whether anything has it and can be seen",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal names this module by its slug rather than by its path.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming no process and a page naming one nobody can read are one answer.",
    },
    {
      invariantKind: "constraint",
      statement: "That answer cannot say which of the two it met, so it names neither.",
    },
  ],
} as const satisfies Module
