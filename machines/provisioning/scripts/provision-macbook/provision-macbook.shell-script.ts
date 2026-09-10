import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const provisionMacbook = {
  id: "01a06864-40db-7195-8270-09f06e301f24",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "provision-macbook",
  definition: "the MacBook brought to parity with the workstation",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
