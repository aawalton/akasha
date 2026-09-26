import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC7373b6ef7e27d82 = {
  id: "01a0c5f3-b3ca-7b97-a071-81caaf5302c6",
  type: "page-type/image",
  slug: "image-c7373b6ef7e27d82",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with fair lightly-freckled skin, soft auburn hair loose, warm green eyes meeting the camera directly in a genuine open-eyed laugh, caught mid-delight as if at something the viewer just said, resting very close, cozy warm indoor light, soft oatmeal sweater, shallow depth of field, very close intimate framing, hands relaxed out of frame, alive joyful safe mood, natural soft skin texture, photographic, 50mm",
  seed: 904218,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
