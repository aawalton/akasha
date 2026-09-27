import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image56b40dba417f59be = {
  id: "01a0c5f3-b3cb-7b56-9856-727de96e9da4",
  type: "page-type/image",
  slug: "image-56b40dba417f59be",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman at a nighttime fair, glowing carnival string lights and warm bokeh behind her, turning to you mid-step with her face lighting up in delight that it is you, warm direct eye contact, colorful soft light on her skin, loose wavy hair, casual cute jacket, natural real skin texture, playful joyful and alive, gentle motion toward you, shallow depth of field with dreamy bokeh lights, intimate close framing, hands relaxed not reaching toward the camera",
  seed: 178453,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/night", "setting-tag/outdoor", "setting-tag/city-street"],
  poseTags: ["pose-tag/reaching", "pose-tag/looking-back", "pose-tag/smiling", "pose-tag/walking"],
  wardrobeTags: ["wardrobe-tag/jacket", "wardrobe-tag/top", "wardrobe-tag/jeans"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
