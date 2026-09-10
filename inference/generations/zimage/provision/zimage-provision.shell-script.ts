import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const zimageProvision = {
  id: "01a06815-9efd-7030-be57-be6d4b92347a",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "zimage-provision",
  definition: "the weights a Z-Image render needs, pulled into the model store",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
