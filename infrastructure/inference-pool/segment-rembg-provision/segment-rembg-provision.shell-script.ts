import type { ShellScript } from "@akasha/code-system/shell-script"

export const segmentRembgProvision = {
  id: "01a06815-9efd-7013-95a5-e00f8aef8298",
  pageTypeSlug: "shell-script",
  slug: "segment-rembg-provision",
  definition: "the conda environment the background remover runs in",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
