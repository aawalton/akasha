import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const provisionWorkstation = {
  id: "01a06864-40db-75c0-8e65-54f538b8d39b",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "provision-workstation",
  definition: "the Linux workstation brought to the state agents work on it in",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
