import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image84dc0e6a40b87023 = {
  id: "01a0c5f3-8d0e-7402-8d20-e1138dd1c9f6",
  type: "page-type/image",
  slug: "image-84dc0e6a40b87023",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman reclining on a velvet chaise in a Viennese suite, classic odalisque pose facing the camera, bare from head to toe, gilt mirror behind, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1566357061,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/indoor", "setting-tag/bedroom"],
  poseTags: ["pose-tag/sitting", "pose-tag/looking-at-viewer", "pose-tag/hand-in-hair"],
  wardrobeTags: ["wardrobe-tag/nude"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
