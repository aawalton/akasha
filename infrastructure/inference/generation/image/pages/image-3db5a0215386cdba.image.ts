import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3db5a0215386cdba = {
  id: "019f1839-44cc-7333-a1bc-ef35771dac15",
  type: "page-type/image",
  slug: "image-3db5a0215386cdba",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a strikingly youthful woman in her early twenties with clear silver eyes holding an ancient calm; long dark hair fading to deep red at the tips; deep crimson-red hooded cloak; soft blue-silver moonlight and warm lantern glow; gently winding a red silk thread around her fingers; warm, knowing, slightly wistful expression; realistic skin texture, 85mm lens, cinematic, sharp focus, no weapon",
  seed: 1003,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
