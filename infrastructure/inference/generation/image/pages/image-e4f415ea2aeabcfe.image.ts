import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE4f415ea2aeabcfe = {
  id: "019f1839-0d57-77d7-9ac3-2160d62922c1",
  type: "page-type/image",
  slug: "image-e4f415ea2aeabcfe",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two young women lovers, a dryad with blossoming vines and small branch-antlers growing through her hair and bark-flecked luminous skin straddled close by a dragon-woman with iridescent scales and horns, hips pressed close in a charged kiss with hands drawing each other in, tasteful bare luminous skin, the dryad warm auburn and the dragon dark-haired, lush green woodland meeting smoldering warm glow, sensual and striking, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80580011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
