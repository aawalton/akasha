import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

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
    "module/readout-answering",
    "module/readout-asking",
    "module/readout-body",
    "module/readout-group-serving",
    "module/readout-serving",
    "module/readout-credential",
    "module/readout-none-left",
    "module/readout-reading",
    "module/readout-relay",
    "module/readout-ring",
    "module/readout-scale-reading",
    "module/readout-tier",
    "stylesheet/readout-look",
  ],
} as const satisfies WorkspacePackage
