import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image88ea41b85c1f466f = {
  id: "019f1839-2e8c-7c42-ab62-157475150ace",
  type: "page-type/image",
  slug: "image-88ea41b85c1f466f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A startlingly youthful woman, luminous newly-made unlined face, the feeling of having just arrived in the world, but with deep still ancient eyes that have watched everything and grieved a little of it. Timeless and classical-clean, not costume, a quiet breath of the divine worn on a young face. Loose natural hair. Close candid portrait, head and shoulders to chest, within arm's reach, she turns and her soft open eyes meet yours directly in a quiet intimate moment. Warm diffused golden light, shallow depth of field, natural real skin with soft asymmetry, tender and fully present, the ancient depth living in the gaze that meets yours. Not studio, not posed, no harsh light. Avoid: studio backdrop, posed glamour, harsh direct sunlight, squinting, eyes looking away, second person in frame, plastic flawless skin.",
  seed: 109,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
