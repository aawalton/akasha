import type { ShellScript } from "@akasha/code-system/shell-script"

export const mlxAudioProvision = {
  id: "01a06815-9efd-700e-b820-b0ec43c2e924",
  pageTypeSlug: "shell-script",
  slug: "mlx-audio-provision",
  definition: "the conda environment an mlx-audio speech service runs in",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
