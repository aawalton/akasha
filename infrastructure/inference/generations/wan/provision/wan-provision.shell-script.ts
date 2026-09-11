import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const wanProvision = {
  id: "01a06815-9efd-7026-98f4-4fe808e955c2",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "wan-provision",
  definition: "the weights a Wan run needs, pulled into the model store",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
