import type { ShellScript } from "@akasha/code-system/shell-script"

export const bashEnv = {
  id: "01a06864-40db-7f4c-89c0-50d81e95b4f5",
  pageTypeSlug: "shell-script",
  slug: "bash-env",
  definition: "what a non-interactive bash reads so it knows where the repo is",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
