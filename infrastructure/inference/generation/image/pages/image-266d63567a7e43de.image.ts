import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image266d63567a7e43de = {
  id: "019f2d47-356b-734c-bf78-4fd2c94ee10d",
  type: "page-type/image",
  slug: "image-266d63567a7e43de",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman in her mid-twenties in a recording booth carved from living canyon rock, walls of layered red-brown stone strata fitted with acoustic foam panels, faint mist drifting through warm lamplight, wind-tangled dark brown hair, warm sun-weathered skin, grey-green eyes, layered woven textiles in stone-grey and terracotta draped like a nymph's dress, brass-and-leather headphones around her neck like a torc, head tilted in an attentive listening posture, lips slightly parted",
  seed: 1329882891,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
