import type { ShellScript } from "@akasha/code-system/shell-script"

export const alanwaltonSeamReset = {
  id: "01a0595b-ef5e-7572-976f-20f08e5bc2b5",
  pageTypeSlug: "shell-script",
  slug: "alanwalton-seam-reset",
  definition: "the app delegate cut back to its own lines before a seam is applied",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
