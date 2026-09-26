import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEe978241d146a68c = {
  id: "01a00fd5-52d1-7474-b5e8-cf12d2385c65",
  type: "page-type/image",
  slug: "image-ee978241d146a68c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful Spanish woman in an Andalusian courtyard at night, sheer black lace shawl over bare shoulders and a deep red dress, dark hair pinned with a comb, one hand lifting her skirt, standing among orange trees and blue tilework, hanging lanterns throwing warm pools of light and deep shadow, meeting the viewer's eye with fire, painterly realism\n",
  seed: 1813810160,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
