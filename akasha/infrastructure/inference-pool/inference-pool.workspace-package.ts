import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const inferencePool = {
  id: "01a06815-9efd-7015-b82a-e620372e1e32",
  pageTypeSlug: "workspace-package",
  slug: "inference-pool",
  definition: "the model services one machine fronts, one resident at a time",
  manifest: "json",
  partSlugs: [
    "module/launchd-service",
    "module/pool-config",
    "module/pool-mutex",
    "module/pool-proxy",
    "module/pool-server",
    "module/pool-swap",
    "module/port-readiness",
    "module/swap-decision",
    "python-module/segment-rembg-server",
    "shell-script/mlx-audio-provision",
    "shell-script/mlx-openai-server-provision",
    "shell-script/mlx-vlm-provision",
    "shell-script/music-gen-provision",
    "shell-script/ollama-provision",
    "shell-script/segment-rembg-provision",
    "shell-script/traffic-cop-provision",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pool fronts each service on a port of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A service is made resident before a request reaches that service.",
    },
    {
      invariantKind: "departure",
      statement: "A service is provisioned into a conda environment named for that service.",
    },
  ],
} as const satisfies WorkspacePackage
