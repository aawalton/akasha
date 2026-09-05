import type { ShellScript } from "@akasha/code-system/shell-script"

export const wanDown = {
  id: "01a06815-9efd-7024-8562-8fb716c958fe",
  pageTypeSlug: "shell-script",
  slug: "wan-down",
  definition: "the Wan container stopped and taken away",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
