import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image476e8ad311381a66 = {
  id: "01a0c5f3-2541-7357-98c4-3120d686da9b",
  type: "page-type/image",
  slug: "image-476e8ad311381a66",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a beautiful fae woman standing in a sunlit enchanted forest glade, like a live-action movie elf, long pointed elf ears, fair pale skin with realistic texture, glowing golden-amber eyes looking at the viewer, long wild voluminous emerald-green hair, calm radiant expression, garment of layered dark green foliage, lush green background with warm shafts of light, cinematic lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
