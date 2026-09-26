import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image86037383a83683de = {
  id: "01a0c5f3-b3c9-7c6e-bc7b-4c86625df1bb",
  type: "page-type/image",
  slug: "image-86037383a83683de",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "West Virginia personified as a beautiful young woman in her early twenties — dark auburn hair loose, worn denim jacket over a floral dress, great rhododendron blossoms in hand, misty Appalachian ridgelines folding into blue distance and a mountain stream behind her, tender mountain-morning fog light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1937363884,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
