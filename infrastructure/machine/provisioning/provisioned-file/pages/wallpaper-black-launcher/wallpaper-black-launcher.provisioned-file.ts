import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const wallpaperBlackLauncher = {
  id: "01a06862-af5c-7292-a50e-3a0578b78d6c",
  type: "page-type/provisioned-file",
  slug: "wallpaper-black-launcher",
  definition: "the desktop entry KDE binds ScrollLock to",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.local/share/applications/wallpaper-black.desktop",
  createdAt: "2026-09-03T17:48:13.020Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
