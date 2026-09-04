import type { ShellScript } from "@akasha/code-system/shell-script"

export const linkMaking = {
  id: "01a06864-40db-7667-b568-c45fb304dce3",
  pageTypeSlug: "shell-script",
  slug: "link-making",
  definition:
    "a symlink made where one is wanted, and a dangling one reported rather than passed over",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
