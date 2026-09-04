import type { ShellScript } from "@akasha/code-system/shell-script"

export const promote = {
  id: "01a06865-abff-7015-9700-1d0c47fdac9e",
  pageTypeSlug: "shell-script",
  slug: "promote",
  definition: "a namespace's Next.js deployment moved to an image tag, rolled back if it fails",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
