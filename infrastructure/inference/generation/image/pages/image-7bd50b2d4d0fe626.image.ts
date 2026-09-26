import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7bd50b2d4d0fe626 = {
  id: "019f1839-4976-7d7e-8f64-2da8dacdcf96",
  type: "page-type/image",
  slug: "image-7bd50b2d4d0fe626",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic ultrawide cinematic photograph, 21:9. A young woman wrapped in a deep crimson-red SILK hood and cloak, seen chest-up and LARGE on the RIGHT third of the frame, turned toward the viewer with direct eye contact and a gentle knowing almost-smile, her hands clasped at her chest with a single red silk thread wound around her fingers. The LEFT half of the frame is calm, dim negative space: a tall arched window with soft moonlight spilling through. Warm cinematic lighting on her, cool quiet shadow on the left. Shallow depth of field, realistic skin texture, sharp focus.",
  seed: 2001,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
