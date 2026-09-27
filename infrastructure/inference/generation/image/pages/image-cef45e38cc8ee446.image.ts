import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCef45e38cc8ee446 = {
  id: "01a0c5f3-9f6f-76a8-b58a-5670bb649223",
  type: "page-type/image",
  slug: "image-cef45e38cc8ee446",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman half in shadow half in light, a single beam across her torso, dramatic chiaroscuro, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1367262295,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/studio", "setting-tag/dark-background", "setting-tag/indoor"],
  poseTags: ["pose-tag/standing", "pose-tag/front-view", "pose-tag/full-body"],
  wardrobeTags: ["wardrobe-tag/nude"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
