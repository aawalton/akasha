import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ffb875f3539f291 = {
  id: "019f1839-0eef-7653-9ba2-936e795223ec",
  type: "page-type/image",
  slug: "image-9ffb875f3539f291",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two young women demon lovers with curved horns and no tails, one seated on a dark stone throne and the other straddling her lap with knees either side, bodies pressed full frontal chest-to-chest, a charged smoldering kiss with hands drawing each other in, tasteful bare luminous skin, one with pale silver hair and one raven-haired, dark fiery atmosphere with warm ember glow, powerful sensual and hot, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80640011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
