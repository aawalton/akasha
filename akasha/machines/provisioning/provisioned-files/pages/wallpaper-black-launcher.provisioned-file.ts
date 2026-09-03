import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const wallpaperBlackLauncher = {
  id: "01a06862-af5c-7292-a50e-3a0578b78d6c",
  pageTypeSlug: "provisioned-file",
  slug: "wallpaper-black-launcher",
  definition: "the desktop entry KDE binds Meta+L to",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.local/share/applications/wallpaper-black.desktop",
} as const satisfies ProvisionedFile
