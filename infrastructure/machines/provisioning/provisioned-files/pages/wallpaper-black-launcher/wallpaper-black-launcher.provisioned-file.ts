import type { ProvisionedFile } from "akasha/infrastructure/machines/provisioning/provisioned-files/provisioned-file.page-type.types.ts"

export const wallpaperBlackLauncher = {
  id: "01a06862-af5c-7292-a50e-3a0578b78d6c",
  pageTypeSlug: "provisioned-file",
  type: "provisioned-file",
  slug: "wallpaper-black-launcher",
  definition: "the desktop entry KDE binds ScrollLock to",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.local/share/applications/wallpaper-black.desktop",
} as const satisfies ProvisionedFile
