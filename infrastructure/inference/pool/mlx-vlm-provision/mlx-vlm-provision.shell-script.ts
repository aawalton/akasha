import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const mlxVlmProvision = {
  id: "01a06815-9efd-7010-b17f-2205819c5b61",
  type: "page-type/shell-script",
  slug: "mlx-vlm-provision",
  definition: "the vision-language service's conda environment",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
