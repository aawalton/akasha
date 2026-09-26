import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAc2e19beff515de5 = {
  id: "01a0c5f3-f000-70ca-b6e3-ade05840c01f",
  type: "page-type/image",
  slug: "image-ac2e19beff515de5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "low side view along the bed of a nude couple, a beautiful blonde woman astride a man rising and sinking on him mid-stroke, thighs taut, the join of their hips visible, her spine curved, full breasts, golden hair swinging with her rhythm, both flushed, dim gold pre-dawn ember light, photorealistic, visible skin texture",
  seed: 1176867333,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
