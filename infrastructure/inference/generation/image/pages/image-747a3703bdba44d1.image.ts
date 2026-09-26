import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image747a3703bdba44d1 = {
  id: "019f2d44-c0aa-78be-8a13-4414d9ed2705",
  type: "page-type/image",
  slug: "image-747a3703bdba44d1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman in her mid-twenties, a mountain nymph in a modern recording booth, long wind-tangled dark hair with small braids, sun-weathered warm skin, pale grey-green misty eyes, layered shawl and top in soft stone-grey and terracotta canyon tones, vintage headphones around her neck like a torc, one expressive hand raised mid-gesture as if conducting a voice, warm amber studio glow, acoustic foam wall behind her",
  seed: 2045122627,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
