import type { ShellScript } from "../../../shell-scripts/shell-script.page-type.ts"

export const monarchUrl = {
  id: "01a05934-fe0d-7f10-9cfc-151487a0cef1",
  pageTypeSlug: "shell-script",
  slug: "monarch-url",
  definition: "the Monarch link a tile's tap opens",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
