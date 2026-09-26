import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE68296cf3d9c5de6 = {
  id: "01a0c5f3-b3c8-78c6-8ec6-6876a7bffdad",
  type: "page-type/image",
  slug: "image-e68296cf3d9c5de6",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic candid portrait of a young woman with light brown skin, dark hair in a soft low bun with loose strands, warm hazel eyes crinkling gently in a real open-eyed laugh looking just past the camera, sitting close in a sunlit kitchen with green plants behind, soft morning light, oversized pale blue linen shirt, relaxed and joyful everyday warmth, shallow depth of field, close framing, hands wrapped around a mug, natural skin texture, photographic, 50mm",
  seed: 194627,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
