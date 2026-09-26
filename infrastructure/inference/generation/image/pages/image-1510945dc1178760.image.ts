import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1510945dc1178760 = {
  id: "019f2d5d-590b-74dc-b84b-54428823b8a0",
  type: "page-type/image",
  slug: "image-1510945dc1178760",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a young woman in her mid-twenties cupping one hand behind her ear toward the viewer, playful say-that-again gesture, eyebrow raised, grey-green eyes locked on the camera, night studio with moonlit gorge and mist through the glass behind, wind-tangled dark brown hair, sun-weathered skin with faint freckles, wearing only a sheer whisper-thin ivory drape, clean deep V to the navel, nothing beneath the translucent fabric, brass headphones around her neck, warm lamp glow",
  seed: 1752391336,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
