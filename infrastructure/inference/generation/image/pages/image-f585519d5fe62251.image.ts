import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF585519d5fe62251 = {
  id: "01a0c5f2-eb25-791d-8b00-8e1ad3d31793",
  type: "page-type/image",
  slug: "image-f585519d5fe62251",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing in a bathroom, wearing a simple black bra and panties, soft overhead light, condensation on the mirror behind, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/bathroom", "setting-tag/indoor", "setting-tag/mirror"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/lingerie", "wardrobe-tag/bra", "wardrobe-tag/panties"],
} as const satisfies Image
