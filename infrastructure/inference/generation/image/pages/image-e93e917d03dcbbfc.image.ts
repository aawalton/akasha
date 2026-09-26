import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE93e917d03dcbbfc = {
  id: "01a0c5f3-2541-779a-8047-ab1ec3a9b3be",
  type: "page-type/image",
  slug: "image-e93e917d03dcbbfc",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a slim Celtic woman standing in a sunlit summer wheat field at golden hour, blazing red hair loose and glowing, bright green eyes, fair freckled skin, serene radiant smile, looking directly at the camera, wearing an ornate emerald-green Gaelic gown with gold Celtic embroidery, a low plunging neckline, long flowing floor-length hem, long fitted sleeves, warm backlight, 35mm full length, photorealistic",
  seed: 711,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
