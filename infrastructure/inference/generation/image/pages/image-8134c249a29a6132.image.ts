import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8134c249a29a6132 = {
  id: "01a0c5f3-b3c8-75aa-b122-58a498bf610c",
  type: "page-type/image",
  slug: "image-8134c249a29a6132",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Mississippi personified as a beautiful young woman in her early twenties — deep brown skin, elegant white dress, large white magnolia blossoms framing her hair, the wide Mississippi river and delta cotton fields glowing behind her, languid golden southern dusk, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 678442508,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
