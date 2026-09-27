import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB16798e96d2673af = {
  id: "01a0c5f3-361f-7cb5-ac9f-129d197f1906",
  type: "page-type/image",
  slug: "image-b16798e96d2673af",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting on a couch with both knees pulled up, arms loosely wrapped around them, chin near her knees, photographed from the other end of the same couch, eyes turned to the viewer with direct warm contact, relaxed soft smile, long straight blonde hair with a side part, naturally pretty face with soft features and subtle asymmetry, light freckles, minimal makeup, real skin texture, blue eyes, fair skin, oversized oatmeal fine-merino-wool t-shirt with soft knit texture, black yoga pants, soft evening light, 50mm, shallow depth of field, photorealistic",
  seed: 334,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-3",
  settingTags: ["setting-tag/living-room", "setting-tag/indoor"],
  poseTags: [
    "pose-tag/sitting",
    "pose-tag/curled-up",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
  ],
  wardrobeTags: ["wardrobe-tag/sweater", "wardrobe-tag/leggings", "wardrobe-tag/long-sleeves"],
  ethnicityTags: ["ethnicity-tag/white"],
} as const satisfies Image
