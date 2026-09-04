import type { ShellScript } from "@akasha/code-system/shell-script"

export const generateCerts = {
  id: "01a0685d-ab5c-76ef-a6d6-06853d055569",
  pageTypeSlug: "shell-script",
  slug: "generate-certs",
  definition: "the cluster authority and the PgBouncer certificate it signs, remade where stale",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
