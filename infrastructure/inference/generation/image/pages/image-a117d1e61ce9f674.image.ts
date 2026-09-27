import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA117d1e61ce9f674 = {
  id: "01a0c5f3-8d0e-7dd9-a77b-f90febb11467",
  type: "page-type/image",
  slug: "image-a117d1e61ce9f674",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman on a Parisian bed touching herself, hand between her thighs, back arched, lips parted in pleasure, eyes locked on the camera, zinc rooftops out the window, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 767410807,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/bedroom", "setting-tag/indoor", "setting-tag/window"],
  poseTags: ["pose-tag/sitting", "pose-tag/knees-up", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/nude"],
  ethnicityTags: ["ethnicity-tag/white"],
} as const satisfies Image
