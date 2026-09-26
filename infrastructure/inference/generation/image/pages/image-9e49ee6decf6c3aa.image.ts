import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e49ee6decf6c3aa = {
  id: "01a0c5f3-2541-7b15-a963-21fba4f2b4ac",
  type: "page-type/image",
  slug: "image-9e49ee6decf6c3aa",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI close-up portrait of a young fae woman, head and shoulders, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large luminous golden-amber irises and oversized pupils, flawless fair pale skin, small delicate nose, soft pink lips, gentle shy smile, like a live-action movie elf, long pointed elf ears, long wild emerald-green hair, dark forest bokeh, soft cinematic rim light, 105mm, shallow depth of field, photorealistic",
  seed: 1012,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
