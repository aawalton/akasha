import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCcac63117e970f1b = {
  id: "01a0c5f3-8d0d-71f9-8f24-d2ed66b09404",
  type: "page-type/image",
  slug: "image-ccac63117e970f1b",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of an elegant young kitsune fox girl with a slim petite figure, a beautiful human womans face with soft smooth human features, small human nose, full human lips, high cheekbones, pale blue slit-pupil eyes, fluffy white fox ears on top of her head and three fluffy white fox tails, long silver-white hair, serene mysterious expression, nude natural figure, standing in a quiet snowy bamboo grove, soft cool light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 902,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/forest", "setting-tag/snow", "setting-tag/outdoor"],
  poseTags: ["pose-tag/standing", "pose-tag/walking", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/barefoot", "wardrobe-tag/nude"],
  fantasyTags: ["fantasy-tag/fox-ears", "fantasy-tag/kitsune", "fantasy-tag/silver-hair"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
