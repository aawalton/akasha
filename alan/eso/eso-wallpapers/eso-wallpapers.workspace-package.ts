import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const esoWallpapers = {
  id: "01a06865-abff-7020-a570-1cce5bbc9b8a",
  pageTypeSlug: "workspace-package",
  slug: "eso-wallpapers",
  definition: "the Elder Scrolls Online wallpapers fetched and cropped for Alan's desktop",
  manifest: "json",
  partSlugs: ["module/eso-wallpaper-crop", "module/eso-wallpaper-download"],
} as const satisfies WorkspacePackage
