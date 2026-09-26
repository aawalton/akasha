import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0bb21334ecd4a398 = {
  id: "01a0c5f3-2541-718e-84a7-b1641cce9a31",
  type: "page-type/image",
  slug: "image-0bb21334ecd4a398",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman in a sunlit enchanted forest glade, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, flawless fair pale skin, small nose, soft lips, shy gentle smile, slim petite figure, like a live-action movie elf, long pointed elf ears, elaborately styled poofy voluminous emerald-green hair with gold tips catching the light, garment of layered dark green foliage, warm shafts of light, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1023,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
