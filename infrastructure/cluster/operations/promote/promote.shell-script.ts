import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const promote = {
  id: "01a06865-abff-7015-9700-1d0c47fdac9e",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "promote",
  definition: "a namespace's Next.js deployment moved to an image tag, rolled back if it fails",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
