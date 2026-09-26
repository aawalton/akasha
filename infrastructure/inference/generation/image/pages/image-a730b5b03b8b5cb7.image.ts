import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA730b5b03b8b5cb7 = {
  id: "019f1839-0e30-7c1c-a37e-e8e0e33c0cc8",
  type: "page-type/image",
  slug: "image-a730b5b03b8b5cb7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two young women lovers, a smoldering demoness with curved horns seated on a dark throne and a radiant angel straddling her lap with knees either side, the angel's white feathered wings folded and swept low behind her back, bodies pressed full frontal chest-to-chest, faces a breath apart in a charged kiss with hands drawing each other in, tasteful bare luminous skin, the angel fair and golden with a soft halo and the demoness dark-haired, divine light meeting dark fire, sensual and charged, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80610011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
