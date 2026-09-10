import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonAppShortcuts = {
  id: "01a0595b-ef55-7c72-8eac-cf790a00ee77",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-app-shortcuts",
  definition: "the Swift offering each app intent as a shortcut",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
