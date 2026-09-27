import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b1d9d4735658670 = {
  id: "01a0c5f3-9f6a-702d-81d0-1db1bb1c10cf",
  type: "page-type/image",
  slug: "image-9b1d9d4735658670",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman tangled in white sheets on a Mykonos hotel bed, sheet across her hips, balcony doors open to the blue Aegean light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 455415773,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: [
    "setting-tag/bedroom",
    "setting-tag/hotel",
    "setting-tag/ocean",
    "setting-tag/balcony",
  ],
  poseTags: ["pose-tag/kneeling", "pose-tag/looking-back", "pose-tag/curled-up"],
  wardrobeTags: ["wardrobe-tag/barefoot", "wardrobe-tag/towel", "wardrobe-tag/partial-undress"],
  ethnicityTags: ["ethnicity-tag/mixed"],
} as const satisfies Image
