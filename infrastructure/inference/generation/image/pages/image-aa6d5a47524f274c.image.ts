import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAa6d5a47524f274c = {
  id: "019f1839-44d1-7faa-8fe0-7e95d9f1604d",
  type: "page-type/image",
  slug: "image-aa6d5a47524f274c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a strikingly youthful woman in her early twenties with an ageless quality in her clear silver eyes; long dark hair fading to deep red at the tips; wearing a deep crimson-red hooded cloak; standing at the edge of a misty forest at dusk, holding a softly glowing red silk thread between her fingers; serene tender expression; golden-hour light, realistic skin texture, cinematic, sharp focus, no weapon",
  seed: 1002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
