import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image857e310d9bf04c95 = {
  id: "019f28ce-5b58-740e-8715-895420ce7174",
  type: "page-type/image",
  slug: "image-857e310d9bf04c95",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite young woman in her mid-twenties standing on bare hilltop bedrock at dawn. Long black hair loosely tied back, soft strands falling across her face. Blind eyes: matte pale stone-white irises with a faint soft pupil, no glow, no luminescence, only natural eye moisture — like discs of white marble set in a normal human eye. Gaze unfocused, slightly past the camera. Calm serious expression, serene and planted. Earth-toned linen wrap top, bare collarbones. Warm low dawn light, mountains soft behind. Natural skin texture, 85mm lens, shallow depth of field.",
  seed: 6101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
