import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE2a15a755511bbd5 = {
  id: "01a0c5f3-9f6a-72e9-b245-a2a9c6565584",
  type: "page-type/image",
  slug: "image-e2a15a755511bbd5",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an Andalusian courtyard drenched by a fountain, thin summer dress soaked clinging to every curve, laughing, orange trees around, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1968715558,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/outdoor",
    "setting-tag/pool",
    "setting-tag/garden",
    "setting-tag/daytime",
  ],
  poseTags: ["pose-tag/standing", "pose-tag/laughing", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/wet", "wardrobe-tag/sundress", "wardrobe-tag/spaghetti-straps"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
