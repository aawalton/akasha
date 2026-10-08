import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const mlxOpenaiServerProvision = {
  id: "01a06815-9efd-700f-81c2-2a39a0828fa9",
  type: "page-type/shell-script",
  slug: "mlx-openai-server-provision",
  definition: "an mlx image service's conda environment",
  shell: "sh",
  sourced: false,
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-22T13:58:21.000Z",
} as const satisfies ShellScript
