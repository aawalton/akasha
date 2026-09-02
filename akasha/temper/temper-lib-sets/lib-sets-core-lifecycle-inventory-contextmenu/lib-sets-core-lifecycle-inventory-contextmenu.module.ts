import type { Module } from "@akasha/code-system/module"

export const libSetsCoreLifecycleInventoryContextmenu = {
  id: "01a06231-8f1d-79ad-893f-8f4a99020fa3",
  pageTypeSlug: "module",
  slug: "lib-sets-core-lifecycle-inventory-contextmenu",
  definition: "whether the set data has finished loading and is safe to ask about",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The keyboard buttons and the inventory context menu are built from this module too.",
    },
    {
      invariantKind: "constraint",
      statement: "A failed readiness check clears the remembered list of inactive set ids.",
    },
  ],
} as const satisfies Module
