import type { ShellScript } from "@akasha/code-system/shell-script"

export const findSession = {
  id: "01a06864-40db-7788-b62b-0c19278aaa92",
  pageTypeSlug: "shell-script",
  slug: "find-session",
  definition: "the transcript file a session id or its prefix names",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
