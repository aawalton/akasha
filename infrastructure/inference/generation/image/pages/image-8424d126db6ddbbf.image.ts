import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8424d126db6ddbbf = {
  id: "01a0c5f3-b3cb-75a0-a27f-807acfadfafd",
  type: "page-type/image",
  slug: "image-8424d126db6ddbbf",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a distinctive striking young woman with a specific memorable Mediterranean face, strong elegant features and warm olive skin, dark curls, the instant she spots you across a sunlit cafe terrace her face bursts into delight that it is you, warm direct eye contact, just-seen-you joy, simple summer dress, natural real skin texture with imperfections, shallow depth of field with soft bokeh, intimate alive and joyful, chest-up close framing, hands relaxed at her sides not reaching toward the camera",
  seed: 173659,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
