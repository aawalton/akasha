import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const ciCostSnapshot = {
  id: "01a06864-40db-77fc-84ff-f16044dcbbc9",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "ci-cost-snapshot",
  definition: "what a session has cost, read from the seat page its id names",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
