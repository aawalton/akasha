import type { ShellScript } from "@akasha/code-system/shell-script"

export const mlxVlmProvision = {
  id: "01a06815-9efd-7010-b17f-2205819c5b61",
  pageTypeSlug: "shell-script",
  slug: "mlx-vlm-provision",
  definition: "the conda environment the vision-language service runs in",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
