import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const utilsRun = {
  id: "01a05d20-8005-763f-8c3e-b80bd06da1d2",
  pageTypeSlug: "workspace-package",
  slug: "utils-run",
  definition: "a process this one starts and what it says",
  manifest: "json",
  partSlugs: ["module/running", "module/spawn-ceiling"],
} as const satisfies WorkspacePackage
