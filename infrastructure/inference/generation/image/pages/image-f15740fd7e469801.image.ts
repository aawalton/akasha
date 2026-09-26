import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF15740fd7e469801 = {
  id: "01a0c5f3-9f6a-72dc-948c-506c8428a95c",
  type: "page-type/image",
  slug: "image-f15740fd7e469801",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "top-down overhead shot of a young fictional Korean kpop idol woman sunbathing on a linen blanket laid on green grass, wearing a sheer mint lace shirt over a bikini bottom, arms relaxed, dappled tree shade and patches of sunlight, natural daylight, flat lay photographic style, visible fabric weave and skin texture, photorealistic",
  seed: 291117164,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
