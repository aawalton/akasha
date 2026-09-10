import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const upscaleSrpo = {
  id: "01a06815-9efd-703b-9a4d-0e474ee50468",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "upscale-srpo",
  definition: "the skin of an upscaled image refined by SRPO",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
