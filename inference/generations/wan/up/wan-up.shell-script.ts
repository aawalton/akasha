import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const wanUp = {
  id: "01a06815-9efd-7023-a90a-d62e5e004185",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "wan-up",
  definition: "the Wan container started with the card attached",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
