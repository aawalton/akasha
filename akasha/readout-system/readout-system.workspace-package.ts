import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const readoutSystem = {
  id: "01a05446-e75c-73a6-9442-0919b16723c0",
  pageTypeSlug: "workspace-package",
  slug: "readout-system",
  definition: "how a reading reaches the person it is for",
  manifest: "json",
  partSlugs: [
    "page-type/readout",
    "page-type/readout-group",
    "page-type/readout-scale",
    "page-type/readout-widget",
    "module/readout-credential",
    "module/readout-reading",
    "module/readout-ring",
  ],
} as const satisfies WorkspacePackage
