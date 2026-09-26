import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC0f0a41f1d556e8c = {
  id: "019f28b9-8ff4-7efa-81aa-ad6e98232f03",
  type: "page-type/image",
  slug: "image-c0f0a41f1d556e8c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite young woman in her mid-twenties standing on bare hilltop bedrock at dawn. Long black hair loosely tied back, soft strands falling across her face. Pale clouded jade-green eyes, unfocused, gazing slightly past the camera — blind, serene. Faint knowing smirk, utterly unbothered. Compact strong build, earth-toned linen wrap top, bare collarbones. Warm low dawn light, mountains soft in the background, fine dust in the air. Natural skin texture, 85mm lens, shallow depth of field.",
  seed: 6101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
