import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9a1a2c05f7d3ac2a = {
  id: "01a0c5f3-3620-7327-9fc0-cb4947df6870",
  type: "page-type/image",
  slug: "image-9a1a2c05f7d3ac2a",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting cross-ways on a couch with knees up, arms resting on them, photographed from the other end of the same couch, head turned to the viewer with direct warm eye contact, soft genuine smile, long straight blonde hair with a side part, natural authentic beauty, soft features with subtle asymmetry, light freckles, minimal makeup, real unretouched skin, blue eyes, fair skin, oversized heather-taupe merino-wool t-shirt, black yoga pants, warm golden evening light, 50mm, shallow depth of field, photorealistic",
  seed: 336,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
