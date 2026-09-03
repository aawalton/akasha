import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const analysisComplexity = {
  id: "01a0680f-d1b7-7a4f-9195-8a87f5f16534",
  pageTypeSlug: "workspace-package",
  slug: "analysis-complexity",
  definition: "how complex the TypeScript in a checkout measures",
  manifest: "json",
  partSlugs: [
    "module/complexity-rows",
    "module/cyclomatic",
    "module/file-discovery",
    "module/halstead",
    "module/maintainability",
    "module/operator-classification",
    "module/walk-functions",
  ],
} as const satisfies WorkspacePackage
