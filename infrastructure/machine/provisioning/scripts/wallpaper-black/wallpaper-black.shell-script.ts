import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const wallpaperBlack = {
  id: "01a06864-40db-7c5e-affa-6167aec19bee",
  type: "page-type/shell-script",
  slug: "wallpaper-black",
  definition: "every desktop's wallpaper turned black and turned back",
  shell: "sh",
  sourced: false,
  installPath: "~/.local/bin/wallpaper-black",
  onlyOn: "linux",
  createdAt: "2026-09-03T17:49:55.803Z",
  updatedAt: "2026-09-15T17:03:01.000Z",
} as const satisfies ShellScript
