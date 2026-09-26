import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image104d3582671c8985 = {
  id: "01a0c5f3-2541-77a7-909f-11ea96874df7",
  type: "page-type/image",
  slug: "image-104d3582671c8985",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI close-up portrait of a young fae woman, head and shoulders, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and oversized pupils, flawless fair pale skin, small delicate nose, soft pink lips, shy gentle smile, like a live-action movie elf, long pointed elf ears, poofy voluminous feathered hair in a smooth ombre gradient from emerald-green roots to bright golden tips, layered wispy feathered texture, garment of dark green foliage at the shoulders, dark forest bokeh, soft cinematic rim light, 105mm, shallow depth of field, photorealistic",
  seed: 1032,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
