import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE17bb1dbb59e756b = {
  id: "01a0c5f3-b3c8-76df-984d-14f23d031992",
  type: "page-type/image",
  slug: "image-e17bb1dbb59e756b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a willow dryad fused with a weeping willow, long draping willow-frond hair flowing into the tree branches behind her, pale green bark-skin, smooth tendrils connecting her arms to the boughs, luminous silver eyes, melancholic grace, standing by a still pond at dusk, cool ethereal light, 35mm full length, photorealistic",
  seed: 814,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
