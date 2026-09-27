import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC7b737fe058f317b = {
  id: "01a0c5f3-b3ca-7c6c-b0af-6ad26f32499b",
  type: "page-type/image",
  slug: "image-c7b737fe058f317b",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "dancer wearing only knit legwarmers, seated on the studio floor with knees drawn up, barre and mirror behind, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 682154474,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/gym", "setting-tag/indoor"],
  poseTags: ["pose-tag/sitting", "pose-tag/curled-up", "pose-tag/looking-at-viewer"],
  wardrobeTags: [
    "wardrobe-tag/socks",
    "wardrobe-tag/sneakers",
    "wardrobe-tag/topless",
    "wardrobe-tag/nude",
  ],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
