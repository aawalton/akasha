import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const exerciseAccess = {
  id: "01a0658f-e6c3-7003-8171-1757be2882f8",
  pageTypeSlug: "workspace-package",
  slug: "exercise-access",
  definition: "how the exercise pages are reached and what their fields may carry",
  manifest: "json",
  partSlugs: [
    "module/exercise-choosing",
    "module/exercise-load-model",
    "module/exercise-rows",
    "module/exercise-vocabulary",
    "module/free-exercise-row",
    "module/mobility-derive",
    "module/selection-features",
    "module/session-closing",
    "module/session-derive",
    "module/set-history",
    "module/set-target",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The exercise pages are read from the checkout this code runs in.",
    },
  ],
} as const satisfies WorkspacePackage
