import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA7cd7a6b93d6d896 = {
  id: "019f2d4d-d7ac-7a5f-94eb-60589e34bdbc",
  type: "page-type/image",
  slug: "image-a7cd7a6b93d6d896",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up close portrait of a young woman in her mid-twenties at a studio microphone at night, moonlit gorge and mist soft-blurred through glass behind her, tangled dark hair over one shoulder, sun-weathered skin with faint freckles, luminous grey-green eyes locked directly on the viewer, a sheer whisper-thin ivory drape with a precise straight deep V opening to the navel, skin faintly visible through the gauze, brass headphones like a torc at her collarbones, lips parted as if about to answer you",
  seed: 703688638,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
