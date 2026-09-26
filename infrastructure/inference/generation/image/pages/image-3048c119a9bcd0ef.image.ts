import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3048c119a9bcd0ef = {
  id: "01a0c5f4-03a3-7351-8417-ca31ea7af27c",
  type: "page-type/image",
  slug: "image-3048c119a9bcd0ef",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid three-quarter-angle photo, two young Korean women mid-twenties slim kpop-idol figures in the rain, one woman in front turned slightly toward the camera, the second woman hugging her from directly behind with her front against the first womans back, the rear womans chin on the front womans shoulder, both looking at the camera with delighted smiles, you see the front of the first woman and only the side of the second, drenched, wet lingerie, tropical garden, soft light, candid snapshot",
  seed: 931634000,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
