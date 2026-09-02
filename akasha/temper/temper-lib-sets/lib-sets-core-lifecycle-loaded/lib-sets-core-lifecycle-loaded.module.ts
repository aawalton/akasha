import type { Module } from "@akasha/code-system/module"

export const libSetsCoreLifecycleLoaded = {
  id: "01a06231-8f1e-7030-91dc-f0bb68a1c8eb",
  pageTypeSlug: "module",
  slug: "lib-sets-core-lifecycle-loaded",
  definition: "what happens once the game announces this add-on has loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The live API version is whatever the client reports unless the constants already name a version.",
    },
    {
      invariantKind: "constraint",
      statement: "Saved variables are loaded before any set data is read.",
    },
    {
      invariantKind: "departure",
      statement: "A debug scan left running across a reload holds back the rest of the load.",
    },
  ],
} as const satisfies Module
