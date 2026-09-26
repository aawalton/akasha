import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image441b686c583ecccc = {
  id: "019f1839-0c8f-7ada-8a0d-e56b01bdf874",
  type: "page-type/image",
  slug: "image-441b686c583ecccc",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two young women demon lovers with curved horns and sleek tails, one straddling the other with hips pressed close in a charged smoldering kiss, hands drawing each other in, tasteful bare luminous skin, one with pale silver hair and one raven-haired, dark fiery atmosphere with warm ember glow, powerful sensual and hot, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80530011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
