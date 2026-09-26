import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCf2499ec55acd30a = {
  id: "01a0c5f3-2541-7345-b917-d8598e104906",
  type: "page-type/image",
  slug: "image-cf2499ec55acd30a",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman in a sunlit enchanted forest glade, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, flawless fair pale skin, small nose, soft lips, shy gentle smile, slim petite figure, like a live-action movie elf, long pointed elf ears, poofy voluminous feathered hair in a smooth ombre gradient from emerald-green roots to bright golden ends, garment of layered dark green foliage, warm shafts of light, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1034,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
