import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image860b74b98e60d250 = {
  id: "019f2d4b-1cb0-7aa1-b4c6-990e750b1971",
  type: "page-type/image",
  slug: "image-860b74b98e60d250",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic three-quarter portrait of a young woman in her mid-twenties in a night recording studio, floor-to-ceiling glass behind her open to a vast moonlit canyon with mist rising, wind-tangled dark hair loose over one shoulder, sun-weathered skin, grey-green eyes catching warm lamplight, a gauzy white lightweight dress hanging in a clean straight fall with a deep V opening to the navel, one expressive hand raised softly as if catching a returning sound, brass headphones resting around her neck, lips parted mid-echo",
  seed: 671172004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
