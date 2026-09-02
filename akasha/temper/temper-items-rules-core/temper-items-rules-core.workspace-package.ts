import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperItemsRulesCore = {
  id: "01a060d9-44cd-7bbd-88e3-944b7a932e9a",
  pageTypeSlug: "workspace-package",
  slug: "temper-items-rules-core",
  definition:
    "the rules saying what becomes of an item and the conditions those rules are written in",
  manifest: "json",
  partSlugs: [
    "module/rule-constants",
    "module/comparison-op-data",
    "module/comparison-op",
    "module/buy-rule-types",
    "module/buy-rule-eval",
    "module/inventory-rule-goals",
    "module/stock-reconcile-plan",
    "module/stock-destination-types",
    "module/use-destination-types",
    "module/use-destination-resolver",
    "module/use-destination-planner",
    "module/potion-restore-resolve",
    "module/scribing-total-script-count",
    "module/can-level-morphs-filter-types",
    "module/required-curse-state-filter-types",
    "module/required-skill-lines-filter-types",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule says what becomes of an item.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies WorkspacePackage
