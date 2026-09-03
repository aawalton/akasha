import type { Module } from "@akasha/code-system/module"

export const inventoryPlanCapabilities = {
  id: "01a068f6-dee0-7713-8806-b95995b92fdc",
  pageTypeSlug: "module",
  slug: "inventory-plan-capabilities",
  definition: "what building an inventory management plan is built from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts a plan run needs are handed over together rather than one by one.",
    },
    {
      invariantKind: "departure",
      statement: "Each part is handed over on its own so a run may take only what it needs.",
    },
    {
      invariantKind: "absence",
      statement: "No plan is built here.",
    },
  ],
} as const satisfies Module
