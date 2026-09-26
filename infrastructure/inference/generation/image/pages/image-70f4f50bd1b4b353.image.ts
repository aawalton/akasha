import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image70f4f50bd1b4b353 = {
  id: "01a0c5f3-7a9b-7277-bd9d-b4e1795c98c4",
  type: "page-type/image",
  slug: "image-70f4f50bd1b4b353",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a strikingly beautiful young woman with an otherworldly quality, long flowing rose-gold copper hair, large luminous amber eyes, delicate elegant features, fair luminous skin with light freckles, a confident challenging-yet-inviting half-smile with a hint of playful snark, wearing a soft sheer warm-toned draped wrap that suggests rather than reveals, intimate warm candlelit interior, shallow depth of field with soft bokeh, cinematic soft lighting, natural realistic skin texture, looking directly into the camera, chest-up framing",
  seed: 412556,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
