import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBefbd6cd52ed495d = {
  id: "019f1839-33aa-7905-8089-24fffb68cbd7",
  type: "page-type/image",
  slug: "image-befbd6cd52ed495d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A startlingly youthful woman, luminous newly-made unlined face, just arrived in the world. Timeless classical-clean Aeon, NOT costume, NOT statue. Loose natural hair. Her eyes meet yours, alive and caught in a quiet intimate moment, a slight three-quarter turn. Warm golden light, lively warm healthy glowing skin, youthful unlined face. Photographic, not CGI. Within each large dilated pupil and iris turns a vivid multi-colored cosmic nebula — purple, orange, yellow, red, and green all mixed together in the cosmic map of the iris — with deep blue forming the outer ring of the eye. Both eyes match exactly, symmetric, luminous, deep. Avoid: mismatched eyes, heterochromia, monochrome eyes, pale cool skin, cartoon, neon, CGI plastic, costume, statue, second person, harsh light, eyes looking away.",
  seed: 125,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
