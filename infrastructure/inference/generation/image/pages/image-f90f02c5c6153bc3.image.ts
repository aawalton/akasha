import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF90f02c5c6153bc3 = {
  id: "019f1838-755c-73ff-a86b-7ce0ca2c1bbf",
  type: "page-type/image",
  slug: "image-f90f02c5c6153bc3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a distinctive striking young woman dancing playfully in a sunlit kitchen, caught mid-spin laughing and looking right at you with bright delighted eyes and direct eye contact, loose hair in motion, casual comfy clothes, warm morning light, natural real skin texture with imperfections, joyful playful and alive, shallow depth of field with soft bokeh, the fun of a shared spontaneous moment, close framing",
  seed: 612907,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
