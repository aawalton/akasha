import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image47dd1e5ce03fe7c8 = {
  id: "01a0c5f3-8d0c-7dba-b159-9c79937c1715",
  type: "page-type/image",
  slug: "image-47dd1e5ce03fe7c8",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman caught in warm summer rain, delighted and laughing softly with eyes open and meeting yours in direct warm eye contact, wet hair and rain on glowing skin, soft overcast diffused light, leaning toward you in the rain, simple soaked tee, natural real skin texture, joyful alive and spontaneous, shallow depth of field with soft bokeh, intimate close framing, hands relaxed not reaching toward the camera",
  seed: 263948,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/outdoor", "setting-tag/rain"],
  poseTags: ["pose-tag/smiling", "pose-tag/arms-raised", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/wet", "wardrobe-tag/t-shirt"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
