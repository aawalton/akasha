import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const mlxOpenaiServerProvision = {
  id: "01a06815-9efd-700f-81c2-2a39a0828fa9",
  type: "page-type/shell-script",
  slug: "mlx-openai-server-provision",
  definition: "an mlx image service's conda environment",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
