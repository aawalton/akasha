import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEb6dc31af3151df6 = {
  id: "019f57e5-bc9c-7677-bd8e-f4319fab8b82",
  type: "page-type/image",
  slug: "image-eb6dc31af3151df6",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "confident dark-skinned woman in a red bodycon mini dress and strappy heels mid-stride crossing the street, hair swinging, downtown night lights, photorealistic photograph, natural skin texture, film grain",
  seed: 894955324,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
