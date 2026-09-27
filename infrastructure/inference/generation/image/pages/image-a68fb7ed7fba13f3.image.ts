import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA68fb7ed7fba13f3 = {
  id: "01a0c5f3-8d0b-7bdb-b275-c96a4970dd11",
  type: "page-type/image",
  slug: "image-a68fb7ed7fba13f3",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a strikingly beautiful otherworldly young woman with luminous silver-white hair and pale ice-blue eyes sharp and meeting yours directly, delicate ethereal features, fair luminous skin, a charged challenging-and-inviting half-smile with playful personality, standing in a cool misty moonlit garden with soft glints, an elegant flowing pale gown, shallow depth of field with soft bokeh, otherworldly and alive, chest-up framing",
  seed: 731904,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/outdoor", "setting-tag/nature"],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/portrait",
  ],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/sheer", "wardrobe-tag/long-sleeves"],
  fantasyTags: ["fantasy-tag/silver-hair", "fantasy-tag/ethereal"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
