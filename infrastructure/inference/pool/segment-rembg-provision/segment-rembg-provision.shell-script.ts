import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const segmentRembgProvision = {
  id: "01a06815-9efd-7013-95a5-e00f8aef8298",
  type: "page-type/shell-script",
  slug: "segment-rembg-provision",
  definition: "the background remover's conda environment",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
