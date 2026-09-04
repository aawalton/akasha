import type { ShellScript } from "@akasha/code-system/shell-script"

export const repoRoots = {
  id: "01a0691b-4f65-7e5d-ad7c-a9523f441291",
  pageTypeSlug: "shell-script",
  slug: "repo-roots",
  definition: "where this checkout is, exported to the shell that sourced this",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
