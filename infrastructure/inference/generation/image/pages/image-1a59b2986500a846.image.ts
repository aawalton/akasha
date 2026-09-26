import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a59b2986500a846 = {
  id: "01a0c5f3-8d0c-7650-9295-4b515b14f4f9",
  type: "page-type/image",
  slug: "image-1a59b2986500a846",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic intimate portrait of a distinctive striking young woman with a specific memorable face, very fair Nordic skin with pale freckles, ash-blonde hair, soft pale grey-blue eyes meeting yours directly with deep warmth and acceptance, a gentle accepting half-smile, resting close in soft morning light, cozy intimate bedroom, natural real skin texture with imperfections, a feeling of being received and not judged, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 836471,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
