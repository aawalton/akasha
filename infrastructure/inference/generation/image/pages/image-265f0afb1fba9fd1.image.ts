import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image265f0afb1fba9fd1 = {
  id: "019f2d48-0cdd-7118-9f24-e4a0ea334b29",
  type: "page-type/image",
  slug: "image-265f0afb1fba9fd1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman in her mid-twenties standing at a microphone in a night studio whose glass wall opens onto a moonlit mountain gorge, thin mist curling in across the floor, wind-tangled dark hair, sun-weathered skin, luminous grey-green eyes catching the console glow, soft layered earth-tone shawl slipping off one shoulder, vintage headphones around her neck, one expressive hand lifted as if catching a returning sound, lips parted mid-echo",
  seed: 1882392785,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
