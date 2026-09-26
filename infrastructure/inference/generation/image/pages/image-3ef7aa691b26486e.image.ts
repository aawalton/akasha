import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3ef7aa691b26486e = {
  id: "019f2d51-31ad-70c5-a36b-8faa2fd81a60",
  type: "page-type/image",
  slug: "image-3ef7aa691b26486e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic waist-up portrait of a young woman in her mid-twenties caught mid-gesture in a night recording studio, one expressive hand lifted as if catching a returning sound, body angled three-quarter but face turned to lock grey-green eyes directly on the viewer, moonlit canyon and drifting mist through the glass wall behind her, wind-tangled dark hair, sun-weathered skin, wearing only a sheer whisper-thin ivory drape with a precise straight deep V open to her navel, nothing underneath the translucent fabric, skin softly visible through it, brass headphones at her collarbones, lips parted as if about to echo you",
  seed: 1167333988,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
