import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image390f655f49f96a25 = {
  id: "019f1838-c83f-72ff-8965-f9b148861841",
  type: "page-type/image",
  slug: "image-390f655f49f96a25",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a photorealistic high-fashion editorial portrait photograph of an 18-year-old human young woman, petite, a thin fine lovely face with delicate refined features, vivid bright red hair styled in an elegant elaborate fashionable updo, natural soft warm blue eyes believably human and not glowing, fair skin lightly sun-warmed and faintly freckled, wearing tasteful refined makeup with softly defined eyes and a subtle warm lip, wearing a striking bold avant-garde gown of her own design with dramatic structured tailoring, rich layered fabric and intricate gold and jewel detailing, far more fashion-forward and editorial than a simple dress, a poised confident striking expression, looking directly at the viewer with cool self-assured elegance, dramatic styled editorial lighting against a rich backdrop, elegant high-fashion composition, cinematic, natural realistic skin texture, highly detailed photorealism",
  seed: 41570011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
