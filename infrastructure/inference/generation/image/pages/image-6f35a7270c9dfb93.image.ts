import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6f35a7270c9dfb93 = {
  id: "01a0c5f3-8d0f-7a25-ac5f-024df37ec4ea",
  type: "page-type/image",
  slug: "image-6f35a7270c9dfb93",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Very beautiful young woman in her early twenties wearing a deep red satin slip with black lace trim slipping off one shoulder and nothing else, dark waves over her shoulders, curled in a leather armchair in a gothic library at midnight with a spell book across her bare thighs, bare feet tucked under her, looking up at the viewer with lips slightly parted, single green banker's lamp and firelight, painterly fantasy realism\n",
  seed: 196418647,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
