import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonIosAdd = {
  id: "01a0595b-ef5a-7e57-89dc-0f19ed549a72",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-ios-add",
  definition: "the run that generates Alan's native project and applies his seam",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
