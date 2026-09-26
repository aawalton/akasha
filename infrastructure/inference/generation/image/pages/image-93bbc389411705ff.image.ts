import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image93bbc389411705ff = {
  id: "019f28c6-30c9-7709-8adf-6c4c5e616fb5",
  type: "page-type/image",
  slug: "image-93bbc389411705ff",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite young woman in her mid-twenties standing on bare hilltop bedrock at dawn. Long black hair loosely tied back, soft strands falling across her face. Her eyes are open but blind: pale milky-white irises, clouded like white marble, gaze unfocused and slightly past the camera. Calm serious expression, serene and planted, utterly unbothered. Earth-toned linen wrap top, bare collarbones. Warm low dawn light, mountains soft in the background. Natural skin texture, 85mm lens, shallow depth of field.",
  seed: 6101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
