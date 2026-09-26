import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48ca3379c7bdb777 = {
  id: "019f28c2-1a48-78c4-b291-6cfe4f82ca7b",
  type: "page-type/image",
  slug: "image-48ca3379c7bdb777",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite young woman in her mid-twenties on bare hilltop bedrock at dawn. Long black hair loosely tied back, soft strands falling across her face. A soft woven eye-cloth in warm earth tones bound over her eyes — an elegant adornment, not a bandage. Wry knowing grin, utterly unbothered, chin slightly tilted. Relaxed easy posture, one shoulder dropped. Earth-toned linen wrap top, bare collarbones. Warm low dawn light, mountains soft in the background. Natural skin texture, 85mm lens, shallow depth of field.",
  seed: 6101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
