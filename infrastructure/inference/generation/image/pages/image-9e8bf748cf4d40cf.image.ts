import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e8bf748cf4d40cf = {
  id: "019f2d54-dbf1-71d1-bccb-f2d11e242cc2",
  type: "page-type/image",
  slug: "image-9e8bf748cf4d40cf",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up close portrait of a young woman in her mid-twenties at a studio microphone at night, moonlit gorge and mist soft-blurred through glass behind her, tangled dark hair over one shoulder, sun-weathered skin with faint freckles, luminous grey-green eyes locked directly on the viewer, wearing only a sheer whisper-thin ivory drape with a precise straight deep V opening to the navel, nothing beneath the translucent gauze, bare skin faintly visible through it, brass headphones like a torc at her collarbones, lips parted as if about to answer you",
  seed: 594940278,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
