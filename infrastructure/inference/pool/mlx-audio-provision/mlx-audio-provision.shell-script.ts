import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const mlxAudioProvision = {
  id: "01a06815-9efd-700e-b820-b0ec43c2e924",
  type: "page-type/shell-script",
  slug: "mlx-audio-provision",
  definition: "an mlx-audio speech service's conda environment",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
