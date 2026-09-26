import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image74fa5e9cf7414f74 = {
  id: "019f202e-0371-737b-b09f-5bfd0cd19fe8",
  type: "page-type/image",
  slug: "image-74fa5e9cf7414f74",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait photograph of a beautiful young elf woman, 19 years old, youthful delicate features, long silver hair, pale glistening skin, delicate pointed ears, sultry warm gaze with a teasing smile, kneeling on soft white sheets facing the camera, graceful sensual arch of the body, wearing a small pale bikini, warm soft intimate lighting, seductive playful and inviting, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 315,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
