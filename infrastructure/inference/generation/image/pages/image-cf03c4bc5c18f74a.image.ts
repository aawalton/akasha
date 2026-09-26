import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCf03c4bc5c18f74a = {
  id: "01a0c5f3-8d0d-7330-b718-c6a9b07fc774",
  type: "page-type/image",
  slug: "image-cf03c4bc5c18f74a",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a playful young cat girl with a slim petite youthful figure, fully human female face (NOT an animal muzzle), only feline traits are fluffy ginger cat ears, a long fluffy orange tail, and bright yellow-green slit-pupil eyes, messy ginger hair, warm cheerful smile, freckles, nude natural figure, kneeling on a cozy bed in warm soft light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 886,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
