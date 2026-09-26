import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1fb431398f44f6ea = {
  id: "01a0c5f3-2542-7303-8105-50d5b63da900",
  type: "page-type/image",
  slug: "image-1fb431398f44f6ea",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "85mm studio portrait of a woman in her early 30s, blonde hair in a simple low bun, blue eyes, fair skin, warm composed smile, navy tailored blazer over cream silk blouse, small pearl earrings, neutral gray backdrop, soft key light, shallow depth of field, visible skin texture, fine fabric weave, photorealistic",
  seed: 834207610,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
