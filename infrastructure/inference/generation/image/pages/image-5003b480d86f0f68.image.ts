import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5003b480d86f0f68 = {
  id: "019f22d1-395e-7def-87b0-3539583f16b6",
  type: "page-type/image",
  slug: "image-5003b480d86f0f68",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide 21:9 cinematic night scene: a beautiful pale Norse sentinel woman on the FAR RIGHT of the frame, chest-up, close and large so her face and iridescent eyes read clearly, turned over her shoulder toward the viewer with direct eye contact, a faint knowing half-smile. Behind and to the LEFT: the long fire-edged wooden bridge sweeps away diagonally across dark ocean, its twin lines of flame converging toward a remote luminous horizon; spray from great waves rises where the bridge meets the sea, catching the firelight in a faint rainbow shimmer. Night sky with soft green-violet aurora. White-gold hair, white-silver-gold attire. Sharp photographic detail, cinematic.",
  seed: 402,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
