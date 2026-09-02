import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperCharactersStats = {
  id: "01a0612f-aae6-7c1d-a590-b3004241a082",
  pageTypeSlug: "workspace-package",
  slug: "temper-characters-stats",
  definition: "the character stats an Elder Scrolls Online build is measured by",
  manifest: "json",
  partSlugs: [
    "module/metric-value-types",
    "module/metric-tree-types",
    "module/formula-types",
    "module/metric-template",
    "module/source-lookup",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The stat display tree here is written out from the metric-tree pages.",
    },
  ],
} as const satisfies WorkspacePackage
