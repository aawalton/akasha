import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6bf7ea958808beea = {
  id: "01a0c5f3-b3c8-779d-9daa-26a894dc73d3",
  type: "page-type/image",
  slug: "image-6bf7ea958808beea",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body fantasy art of a mysterious deep-sea mermaid in dark blue water, bare chested with no clothing on her torso, long dark hair flowing around her covering her chest, bioluminescent markings along her deep-purple scaled tail and arms, pale skin, glowing violet eyes, enigmatic expression, faint blue glow in the darkness, 35mm full length, photorealistic, artful",
  seed: 822,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/underwater", "setting-tag/ocean"],
  poseTags: ["pose-tag/floating", "pose-tag/standing", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/topless", "wardrobe-tag/nude"],
  fantasyTags: ["fantasy-tag/tail", "fantasy-tag/mermaid", "fantasy-tag/glowing-eyes"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
