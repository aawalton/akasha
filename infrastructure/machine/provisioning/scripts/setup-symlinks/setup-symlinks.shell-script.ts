import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const setupSymlinks = {
  id: "01a06864-40db-7e85-9566-bd493d09bca2",
  type: "page-type/shell-script",
  slug: "setup-symlinks",
  definition: "every provisioned file put where the thing that reads it looks",
  shell: "sh",
  sourced: false,
  scripting: {},
} as const satisfies ShellScript
