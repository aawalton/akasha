import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image12ccac417ccf78ef = {
  id: "01a0c5f3-f000-7c1e-9c9f-af5c34598c5c",
  type: "page-type/image",
  slug: "image-12ccac417ccf78ef",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "view from over a man's shoulder of a beautiful nude blonde woman riding him in bed, her hips astride his, joined mid-motion, her hands braced on his shoulders, breasts swaying close above his face, deep flush down her chest, golden hair loose and wild, ember light, photorealistic, shallow depth of field, visible skin texture",
  seed: 830588173,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
