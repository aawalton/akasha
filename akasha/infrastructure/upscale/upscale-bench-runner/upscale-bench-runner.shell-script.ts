import type { ShellScript } from "@akasha/code-system/shell-script"

export const upscaleBenchRunner = {
  id: "01a06815-9efd-703d-a305-1eca8ff85289",
  pageTypeSlug: "shell-script",
  slug: "upscale-bench-runner",
  definition: "the benchmark one upscale job runs inside the cluster",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
