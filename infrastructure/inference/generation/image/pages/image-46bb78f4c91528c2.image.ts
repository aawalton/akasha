import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image46bb78f4c91528c2 = {
  id: "01a0c5f3-8d0b-754f-81ef-8585e3fea62a",
  type: "page-type/image",
  slug: "image-46bb78f4c91528c2",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with fair skin and soft freckles, auburn curls loose in the breeze, warm hazel eyes meeting the camera with gentle steady contentment, a soft genuine almost-smile, resting close in a sunlit green garden with dappled light through leaves, soft natural daylight, simple soft sage linen dress, shallow depth of field, very close intimate framing, hands relaxed out of frame, alive serene safe mood, natural soft skin texture, photographic, 50mm",
  seed: 627194,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
