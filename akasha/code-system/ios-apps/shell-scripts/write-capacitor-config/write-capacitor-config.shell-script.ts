import type { ShellScript } from "../../../shell-scripts/shell-script.page-type.ts"

export const writeCapacitorConfig = {
  id: "01a05934-fe0e-7785-bb6a-bdfc081e0a63",
  pageTypeSlug: "shell-script",
  slug: "write-capacitor-config",
  definition: "the bundle id and display name put into a shell's Capacitor config",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
