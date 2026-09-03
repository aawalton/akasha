import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const exerciseAccess = {
  id: "01a0658f-e6c3-7003-8171-1757be2882f8",
  pageTypeSlug: "workspace-package",
  slug: "exercise-access",
  definition: "how the exercise pages are reached and what their fields may carry",
  manifest: "json",
  partSlugs: [
    "module/exercise-choosing",
    "module/exercise-finding",
    "module/exercise-history",
    "module/exercise-naming",
    "module/exercise-rows",
    "module/exercise-vocabulary",
    "module/selection-policy",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The exercise pages are read from the checkout this code runs in.",
    },
    {
      invariantKind: "stopgap",
      statement: "The pages read here are the collections package's rather than akasha's.",
    },
  ],
} as const satisfies WorkspacePackage
