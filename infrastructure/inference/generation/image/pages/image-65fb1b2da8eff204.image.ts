import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image65fb1b2da8eff204 = {
  id: "01a0c5f2-eb20-7981-b72e-ba8f97c89425",
  type: "page-type/image",
  slug: "image-65fb1b2da8eff204",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman exploring rocky tide pools on a coastline, casual rolled jeans and sweater, soft overcast coastal light, curious gentle smile, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/beach", "setting-tag/rocks", "setting-tag/outdoor"],
  poseTags: ["pose-tag/squatting", "pose-tag/looking-down"],
  wardrobeTags: ["wardrobe-tag/jeans", "wardrobe-tag/sweater", "wardrobe-tag/sneakers"],
} as const satisfies Image
