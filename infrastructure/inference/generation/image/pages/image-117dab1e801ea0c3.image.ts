import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image117dab1e801ea0c3 = {
  id: "01a0c5f3-3620-7ccb-b832-5e02c67844f1",
  type: "page-type/image",
  slug: "image-117dab1e801ea0c3",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties standing waist-deep in the sea, both hands pushing wet blonde hair back from her face, elbows up, looking straight into the camera with direct warm eye contact, soft confident smile, naturally pretty face with soft features, light freckles, minimal makeup, real skin texture glistening with seawater, blue eyes, fair skin, dusty-rose bikini, late afternoon sun, 85mm, photorealistic",
  seed: 424,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/ocean",
    "setting-tag/beach",
    "setting-tag/outdoor",
    "setting-tag/water",
  ],
  poseTags: [
    "pose-tag/hand-in-hair",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/standing",
  ],
  wardrobeTags: ["wardrobe-tag/bikini", "wardrobe-tag/swimsuit"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
