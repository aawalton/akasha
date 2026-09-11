import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const wanSmoke = {
  id: "01a06815-9efd-7025-a285-98a8e937ee09",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "wan-smoke",
  definition: "proof the Wan image reaches the card and loads the nodes a run needs",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
