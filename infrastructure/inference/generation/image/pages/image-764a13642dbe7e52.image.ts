import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image764a13642dbe7e52 = {
  id: "019f5a64-1ebc-7ac4-9525-50234ffe7a74",
  type: "page-type/image",
  slug: "image-764a13642dbe7e52",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman with a single length of marigold sari silk draped over one shoulder covering her chest, bare midriff, jasmine garden light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 825884701,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
