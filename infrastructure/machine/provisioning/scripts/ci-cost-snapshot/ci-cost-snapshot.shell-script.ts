import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const ciCostSnapshot = {
  id: "01a06864-40db-77fc-84ff-f16044dcbbc9",
  type: "page-type/shell-script",
  slug: "ci-cost-snapshot",
  definition: "what a session has cost, read from the seat page its id names",
  shell: "sh",
  sourced: false,
  scripting: {},
  installPath: "~/.local/bin/ci-cost-snapshot",
  onlyOn: "any",
  createdAt: "2026-09-03T17:49:55.803Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
