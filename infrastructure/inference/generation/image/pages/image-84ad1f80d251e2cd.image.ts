import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image84ad1f80d251e2cd = {
  id: "01a0c5f3-361f-7d80-800d-41046d780160",
  type: "page-type/image",
  slug: "image-84ad1f80d251e2cd",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window at home, golden hour light, body angled 45 degrees from the camera, face turned back toward the lens, direct warm eye contact, relaxed post-workout glow, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, sage ribbed sports bra under an unzipped cream hoodie, 85mm, shallow depth of field, photorealistic",
  seed: 1616244244,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-3",
  settingTags: ["setting-tag/indoor", "setting-tag/home", "setting-tag/window"],
  poseTags: [
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/standing",
    "pose-tag/looking-back",
  ],
  wardrobeTags: ["wardrobe-tag/sports-bra", "wardrobe-tag/hoodie", "wardrobe-tag/off-shoulder"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
