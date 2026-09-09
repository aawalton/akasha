import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const change = {
  id: "01a08173-9ce6-7b9e-9368-d7b307f3c674",
  pageTypeSlug: "workspace-package",
  type: "workspace-package",
  slug: "change",
  definition: "how a change to the repository is worked out and reached by name",
  manifest: "json",
  parts: ["page-type/change"],
} as const satisfies WorkspacePackage
