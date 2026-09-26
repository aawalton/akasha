import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image60178238f11084b0 = {
  id: "01a0c5f3-b3cb-7b13-bf12-ce6c92e8f15d",
  type: "page-type/image",
  slug: "image-60178238f11084b0",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Colorado personified as a beautiful young woman in her early twenties — sun-streaked brown hair braided over one shoulder, hiking jacket in deep blue and white like the state flag, purple columbine flowers in hand, golden aspens and snow-capped Rocky Mountain peaks behind her, crisp alpine morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 718394303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
