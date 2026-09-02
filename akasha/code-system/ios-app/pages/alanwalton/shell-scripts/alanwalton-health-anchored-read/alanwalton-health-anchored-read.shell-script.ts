import type { ShellScript } from "@akasha/code-system/shell-script"

export const alanwaltonHealthAnchoredRead = {
  id: "01a0595b-ef58-76f8-9419-7a315c06c969",
  pageTypeSlug: "shell-script",
  slug: "alanwalton-health-anchored-read",
  definition: "the Swift running one anchored query page and returning its samples and anchor",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
