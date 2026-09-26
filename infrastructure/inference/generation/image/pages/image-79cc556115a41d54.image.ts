import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image79cc556115a41d54 = {
  id: "01a0c5f3-8d0f-7517-923c-01c44f3dee34",
  type: "page-type/image",
  slug: "image-79cc556115a41d54",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a slim fair-skinned young woman in her early twenties, delicate kpop-idol features, chin-length sky-blue bob with a soft side-swept fringe, clear bright sky-blue eyes, natural soft skin texture, wearing an oversized soft grey hoodie, curled up in a cozy gaming bedroom strung with warm fairy lights, soft warm lamplight, looking directly at the camera with a warm genuine mid-laugh smile, chest-up close intimate framing, relaxed, shot on 85mm, photoreal, natural skin detail",
  seed: 7001,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
