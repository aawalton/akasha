import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAf3f5d4934ba5c41 = {
  id: "01a0c5f3-9f6d-78c8-a4ff-b682f71b0ce5",
  type: "page-type/image",
  slug: "image-af3f5d4934ba5c41",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic candid intimate portrait of a naturally pretty young woman with soft gentle quiet demeanor, genuine relaxed warm smile, real natural skin texture with subtle imperfections and light freckles, slightly tousled unstyled dark hair, soft diffused window light, sitting close in a cozy sunlit room, casual soft loose linen shirt, warm dark eyes meeting yours with quiet affection, shallow depth of field with soft bokeh, naturalistic not glossy, an unguarded real human moment, chest-up framing",
  seed: 305914,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
