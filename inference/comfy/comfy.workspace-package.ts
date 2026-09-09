import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const comfy = {
  id: "01a06810-0b68-7eaa-8bd1-c312063e493d",
  pageTypeSlug: "workspace-package",
  slug: "comfy",
  definition: "what ComfyUI is asked to run",
  manifest: "json",
  parts: ["module/comfy-graph"],
} as const satisfies WorkspacePackage
