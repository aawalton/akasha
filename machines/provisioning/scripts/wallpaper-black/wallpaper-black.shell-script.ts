import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const wallpaperBlack = {
  id: "01a06864-40db-7c5e-affa-6167aec19bee",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "wallpaper-black",
  definition: "every desktop's wallpaper turned black and turned back",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
