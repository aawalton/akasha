import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA01d52a435cdcb3e = {
  id: "01a0c5f3-2541-770d-aaff-c2efc28fe543",
  type: "page-type/image",
  slug: "image-a01d52a435cdcb3e",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a beautiful fae woman, like a live-action movie elf, long pointed elf ears, fair pale skin with realistic texture and pores, luminous glowing golden-amber eyes looking directly at the viewer, long wild voluminous emerald-green hair, delicate features, serene expression, wearing a garment of dark green foliage, dark enchanted forest background with soft bokeh, cinematic lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1001,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
