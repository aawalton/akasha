import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFc651c25db608ba5 = {
  id: "01a0c5f3-db28-71ca-9158-fd1ae83e8da8",
  type: "page-type/image",
  slug: "image-fc651c25db608ba5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a beautiful blonde woman in her late twenties, loose tousled hair, blue eyes, fair luminous skin, lying nude in rumpled white linen sheets the morning after, sheet slipped low around her hips, bare breasts, propped on one elbow looking up at the viewer with a warm sleepy just-woken smile of invitation, golden morning window light across her body, 85mm portrait, shallow depth of field, visible skin texture, fine linen weave, photorealistic",
  seed: 307031481,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
