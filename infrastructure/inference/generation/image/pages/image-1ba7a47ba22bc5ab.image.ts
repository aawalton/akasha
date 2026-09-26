import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ba7a47ba22bc5ab = {
  id: "01a0c5f3-9f6b-7487-8dc7-025b04d0d7a3",
  type: "page-type/image",
  slug: "image-1ba7a47ba22bc5ab",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic breathtaking ethereal portrait of a stunningly beautiful young woman, an unexpected otherworldly femininity, luminous glowing skin, large captivating expressive eyes with an intimate soul-deep gaze meeting the viewer, soft flowing hair catching light, delicate features of rare striking beauty, dreamlike soft rim lighting, bare shoulders, an arresting beauty beyond the ordinary, 85mm, exquisite hyperreal skin detail, shallow depth of field",
  seed: 1802752463,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
