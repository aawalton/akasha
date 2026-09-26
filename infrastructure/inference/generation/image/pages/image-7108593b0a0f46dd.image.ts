import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7108593b0a0f46dd = {
  id: "019f1839-35f5-74c4-b772-a0dcd585bcbc",
  type: "page-type/image",
  slug: "image-7108593b0a0f46dd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ultrawide cinematic 21:9 portrait composition. A young woman on the RIGHT side of the frame, close and large, waist-up, turned toward the viewer with direct soft eye contact, calm and tender and quietly present. Warm golden late-afternoon light. On the LEFT half of the frame: a tall arched window pouring soft golden light into a dim quiet workshop where faint glowing lanterns recede into warm shadow — open, calm, uncluttered negative space. She occupies the right third; the left half stays atmospheric and empty. Loose natural hair, timeless classical-clean clothing, soft shallow depth of field, photographic, cinematic.",
  seed: 202,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
