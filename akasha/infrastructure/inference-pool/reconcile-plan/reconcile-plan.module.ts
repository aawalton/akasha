import type { Module } from "@akasha/code-system/module"

export const reconcilePlan = {
  id: "01a0685d-4b35-7009-a74b-6d64dd6c2f08",
  pageTypeSlug: "module",
  slug: "reconcile-plan",
  definition: "what stands on a host set against what is declared, read as apply, skip or prune",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A service is skipped only where its directory, environment, health, launchd job and hash all agree.",
    },
    {
      invariantKind: "departure",
      statement: "A managed environment is kept even though no service declares it.",
    },
    {
      invariantKind: "departure",
      statement: "Anything standing that nothing declares or keeps is pruned.",
    },
    { invariantKind: "departure", statement: "A plan is read without reaching the host." },
  ],
} as const satisfies Module
