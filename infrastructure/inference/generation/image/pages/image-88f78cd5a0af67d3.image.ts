import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image88f78cd5a0af67d3 = {
  id: "01a0c5f3-2541-7bf2-958d-56eb6b29c59d",
  type: "page-type/image",
  slug: "image-88f78cd5a0af67d3",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman in a sunlit enchanted forest glade, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and oversized pupils, flawless fair pale skin, small nose, soft lips, slim petite figure, like a live-action movie elf, long pointed elf ears, long wild voluminous emerald-green hair, calm gentle expression looking at the viewer, garment of layered dark green foliage, warm shafts of light, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1014,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
