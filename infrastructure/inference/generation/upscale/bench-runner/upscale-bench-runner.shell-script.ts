import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const upscaleBenchRunner = {
  id: "01a06815-9efd-703d-a305-1eca8ff85289",
  type: "page-type/shell-script",
  slug: "upscale-bench-runner",
  definition: "the benchmark an upscale job runs inside the cluster",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
