import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const namedFor = {
  id: "01a05c53-bc6a-7abd-bdd4-f484ded3d33b",
  pageTypeSlug: "workspace-package",
  slug: "named-for",
  definition: "the name a page is filed under, worked out from a rule and what fills the rule",
  manifest: "json",
  partSlugs: ["module/page-stem", "module/name-rule"],
} as const satisfies WorkspacePackage
