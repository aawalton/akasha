import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4f5fd5cfb94587ef = {
  id: "019f1838-ba23-74ed-957b-6e29e0275e4d",
  type: "page-type/image",
  slug: "image-4f5fd5cfb94587ef",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a photorealistic quiet candid portrait photograph of an 18-year-old human young woman, petite, a thin fine lovely face with delicate refined features, vivid bright red hair loose and soft, natural soft warm blue eyes believably human and not glowing, fair skin lightly sun-warmed and faintly freckled, wearing tasteful refined makeup with softly defined eyes and a subtle warm lip, wearing a simple soft deep green gown, seated alone by a tall window looking out pensively, not looking at the camera, a soft wistful contemplative expression with a faraway look in her eyes, cool soft natural window light falling across her face from the side, a quiet introspective mood, intimate but unposed three-quarter composition, cinematic, natural realistic skin texture and freckles, highly detailed photorealism",
  seed: 41580011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
