import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const rg = {
  id: "01a06864-40db-7fc2-a601-054aa52bdfc7",
  type: "shell-script",
  slug: "rg",
  definition: "ripgrep reached without a socket on its input",
  shell: "sh",
  sourced: false,
  installPath: "~/.local/bin/rg",
  onlyOn: "any",
} as const satisfies ShellScript
