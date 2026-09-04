import type { ShellScript } from "@akasha/code-system/shell-script"

export const wallpaperBlack = {
  id: "01a06864-40db-7c5e-affa-6167aec19bee",
  pageTypeSlug: "shell-script",
  slug: "wallpaper-black",
  definition: "every desktop's wallpaper turned black and turned back",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
