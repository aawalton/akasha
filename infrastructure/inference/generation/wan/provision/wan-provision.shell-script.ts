import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const wanProvision = {
  id: "01a06815-9efd-7026-98f4-4fe808e955c2",
  type: "page-type/shell-script",
  slug: "wan-provision",
  definition: "the weights a Wan run needs, pulled into the model store",
  shell: "sh",
  sourced: false,
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
