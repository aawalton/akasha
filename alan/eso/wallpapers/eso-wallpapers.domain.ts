import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const esoWallpapers = {
  id: "01a06865-abff-7020-a570-1cce5bbc9b8a",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "eso-wallpapers",
  definition: "the Elder Scrolls Online wallpapers fetched and cropped for Alan's desktop",
  parts: ["module/eso-wallpaper-crop", "module/eso-wallpaper-download"],
} as const satisfies Domain
