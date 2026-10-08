import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const rg = {
  id: "01a06864-40db-7fc2-a601-054aa52bdfc7",
  type: "page-type/shell-script",
  slug: "rg",
  definition: "ripgrep reached without a socket on its input",
  shell: "sh",
  sourced: false,
  installPath: "~/.local/bin/rg",
  onlyOn: "any",
  createdAt: "2026-09-03T17:49:55.803Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
