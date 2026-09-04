import type { ShellScript } from "@akasha/code-system/shell-script"

export const alanwaltonPlistKeys = {
  id: "01a0595b-ef5e-7355-9321-5105aa180e67",
  pageTypeSlug: "shell-script",
  slug: "alanwalton-plist-keys",
  definition: "the Info.plist keys the seam writes with PlistBuddy",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
