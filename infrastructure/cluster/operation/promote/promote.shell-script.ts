import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const promote = {
  id: "01a06865-abff-7015-9700-1d0c47fdac9e",
  type: "page-type/shell-script",
  slug: "promote",
  definition: "a namespace's Next.js deployment moved to an image tag, rolled back if it fails",
  shell: "sh",
  sourced: false,
  scripting: {},
  createdAt: "2026-09-03T17:51:28.767Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
