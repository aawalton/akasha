import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const wan = {
  id: "01a06815-9efd-7028-bfc6-b3c3933ac08c",
  pageTypeSlug: "workspace-package",
  slug: "wan",
  definition: "video made from a still image by the Wan diffusion model",
  manifest: "json",
  partSlugs: [
    "container-recipe/wan-image",
    "module/wan-backbone",
    "module/wan-extend-graph",
    "module/wan-i2v-graph",
    "module/wan-size",
    "python-module/wan-frame-scoring",
    "shell-script/wan-down",
    "shell-script/wan-provision",
    "shell-script/wan-smoke",
    "shell-script/wan-up",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A graph is built here and run by whoever holds the daemon.",
    },
    {
      invariantKind: "departure",
      statement: "The two experts split one sampling run at the step halfway through.",
    },
  ],
} as const satisfies WorkspacePackage
