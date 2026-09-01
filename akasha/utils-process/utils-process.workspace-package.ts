import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const utilsProcess = {
  id: "01a05c4f-6f2b-7cf2-8361-788954595f9a",
  pageTypeSlug: "workspace-package",
  slug: "utils-process",
  definition: "what the operating system says about a process another process did not start",
  manifest: "json",
  partSlugs: ["module/pid-signal"],
} as const satisfies WorkspacePackage
