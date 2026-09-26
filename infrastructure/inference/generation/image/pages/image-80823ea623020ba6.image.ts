import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image80823ea623020ba6 = {
  id: "01a0c5f3-8d0e-762d-b786-c0374300e65f",
  type: "page-type/image",
  slug: "image-80823ea623020ba6",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "serene woman in an ivory satin corset with garter straps and stockings, standing by a window gazing down, soft overcast light, photorealistic photograph, natural skin texture, film grain",
  seed: 1692747254,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
