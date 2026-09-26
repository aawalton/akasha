import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA235a5e84a20626a = {
  id: "019f5808-7155-7549-8cba-99ea4fab7bbc",
  type: "page-type/image",
  slug: "image-a235a5e84a20626a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "luxuriant dark-skinned woman in gold body chains over a black bikini resting at a rooftop infinity pool edge, heavy-lidded gaze, dusk skyline, photorealistic photograph, natural skin texture, film grain",
  seed: 1473350037,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
