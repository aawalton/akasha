import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image374c3210187e1238 = {
  id: "019f57cf-bc19-706c-8f48-02413e986d37",
  type: "page-type/image",
  slug: "image-374c3210187e1238",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "joyful brown-skinned woman in a plunging gold sequin mini dress, mid-dance with arms up laughing, confetti-filled nightclub, sparkling strobe light, photorealistic photograph, natural skin texture, film grain",
  seed: 1027719005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
