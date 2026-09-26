import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image34785b6a854e3ab9 = {
  id: "01a0c5f3-b3c8-7c38-afbf-dd7f8d96d408",
  type: "page-type/image",
  slug: "image-34785b6a854e3ab9",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body fantasy art of a young mermaid swimming through a vivid coral reef, bare chested with no clothing on her torso, long flowing teal hair drifting in the water partly veiling her, iridescent turquoise scaled tail, fair skin with a faint scale shimmer along her sides, green eyes, serene expression, shafts of sunlight through clear blue water, colorful fish around her, 35mm full length, photorealistic, tasteful artful underwater photography",
  seed: 821,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
