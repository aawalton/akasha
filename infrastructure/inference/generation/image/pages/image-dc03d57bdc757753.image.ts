import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDc03d57bdc757753 = {
  id: "01a0c5f3-9f6c-7d20-9639-76ac28c2344c",
  type: "page-type/image",
  slug: "image-dc03d57bdc757753",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a batik sarong tied low on her hips, one arm across her chest, turquoise lagoon behind, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1224365080,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
