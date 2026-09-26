import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF5006bbbf13cb05a = {
  id: "019f1837-d3af-7bbc-a740-df796a957f53",
  type: "page-type/image",
  slug: "image-f5006bbbf13cb05a",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "change her clothing to athletic leggings and a fitted sports top, and change the background to a modern indoor gym with exercise equipment, keep her face, hairstyle, and identity exactly the same, deep emerald green eyes, photorealistic",
  seed: 2092820963,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-d8452eca782f2a21",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
