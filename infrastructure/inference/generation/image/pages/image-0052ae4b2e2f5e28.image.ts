import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0052ae4b2e2f5e28 = {
  id: "019f1839-0a3b-72bd-a0b0-5a38bc11f2eb",
  type: "page-type/image",
  slug: "image-0052ae4b2e2f5e28",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two dryad forest-nymph lovers, one straddling the other's lap, faces a breath apart gazing at each other's lips about to kiss, hands drawing each other close, tasteful bare luminous skin with delicate leaf and bark accents, warm auburn and chestnut hair woven with leaves, dappled green forest light through the canopy, sensual and breathless, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80430011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
