import type { ShellScript } from "@akasha/code-system/shell-script"

export const mlxOpenaiServerProvision = {
  id: "01a06815-9efd-700f-81c2-2a39a0828fa9",
  pageTypeSlug: "shell-script",
  slug: "mlx-openai-server-provision",
  definition: "the conda environment an mlx image service runs in",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
