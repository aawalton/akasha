import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const wanSmoke = {
  id: "01a06815-9efd-7025-a285-98a8e937ee09",
  type: "page-type/shell-script",
  slug: "wan-smoke",
  definition: "proof the Wan image reaches the card and loads the nodes a run needs",
  shell: "sh",
  sourced: false,
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
