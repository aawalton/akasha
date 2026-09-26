import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF471905f6b42f57b = {
  id: "01a0c5f3-6910-7c65-9803-1dc750277c7c",
  type: "page-type/image",
  slug: "image-f471905f6b42f57b",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal portrait, a luminous guardian-spirit woman, a soft halo of glowing arcane script-light behind her like wings of writing; ethereal and benevolent, a guiding daimon at your shoulder; gently radiant skin, a calm protective gaze; warm gold and pale blue luminescence against deep dark, volumetric light, painterly realism, feminine and divine, not robotic",
  seed: 301558360,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
