import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC71a490c2f49469a = {
  id: "01a0c5f3-2542-723c-9aec-9e0e6c4591da",
  type: "page-type/image",
  slug: "image-c71a490c2f49469a",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s, head and shoulders, looking directly into the camera, gentle closed-mouth smile, blonde hair down and loose, blue eyes, fair skin with visible texture, oatmeal knit sweater, soft window light from the left, neutral home background, 105mm, shallow depth of field, photorealistic",
  seed: 736144343,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
