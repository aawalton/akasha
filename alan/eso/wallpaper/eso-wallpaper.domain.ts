import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const esoWallpaper = {
  id: "01a06865-abff-7020-a570-1cce5bbc9b8a",
  type: "page-type/domain",
  slug: "eso-wallpaper",
  definition: "wallpapers from The Elder Scrolls Online",
  parts: ["module/eso-wallpaper-crop", "module/eso-wallpaper-download"],
} as const satisfies Domain
