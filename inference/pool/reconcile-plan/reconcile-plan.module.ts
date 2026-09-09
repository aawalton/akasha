import type { Module } from "@akasha/code/module"

export const reconcilePlan = {
  id: "01a0685d-4b35-7009-a74b-6d64dd6c2f08",
  pageTypeSlug: "module",
  type: "module",
  slug: "reconcile-plan",
  definition: "what is on a host set against what is declared, read as apply, skip or prune",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service is skipped only where every check about that service agrees.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks are its directory and environment and health and launchd job and hash.",
    },
    {
      invariantKind: "departure",
      statement: "A managed environment is kept even though no service declares that environment.",
    },
    {
      invariantKind: "departure",
      statement: "Anything on the host that nothing declares or keeps is pruned.",
    },
    { invariantKind: "departure", statement: "A plan is read without reaching the host." },
  ],
} as const satisfies Module
