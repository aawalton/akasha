import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB431d376eb40fec8 = {
  id: "01a0c5f3-b3ca-76d2-832c-c144cb385e4d",
  type: "page-type/image",
  slug: "image-b431d376eb40fec8",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close portrait of a beautiful young woman with a vivid mischievous personality shining through, one eyebrow slightly raised, a knowing crooked half-smirk, bright pale sea-green eyes locked challengingly and invitingly on you, tousled wind-messed chestnut hair, natural real skin texture with light freckles, casual worn soft t-shirt, warm moody indoor light, shallow depth of field with soft bokeh, candid alive and unposed, a real person with genuine attitude meeting your eyes, close intimate framing",
  seed: 224860,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
