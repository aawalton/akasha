import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const findSession = {
  id: "01a06864-40db-7788-b62b-0c19278aaa92",
  type: "page-type/shell-script",
  slug: "find-session",
  definition: "the transcript file a session id or its prefix names",
  shell: "sh",
  sourced: false,
  installPath: "~/.local/bin/find-session",
  onlyOn: "any",
  createdAt: "2026-09-03T17:49:55.803Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
