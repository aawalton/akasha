import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2a81eb19eea44d99 = {
  id: "01a0c5f3-b3ca-70b6-8f20-044e031aee67",
  type: "page-type/image",
  slug: "image-2a81eb19eea44d99",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman with a red one-piece swimsuit rolled down to her waist, arm across her chest, poolside sun, wet skin, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1565549058,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/pool", "setting-tag/outdoor", "setting-tag/daytime"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/looking-back", "pose-tag/close-up"],
  wardrobeTags: ["wardrobe-tag/swimsuit"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
