import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF5e0328094a7b862 = {
  id: "01a0c5f3-b3cb-7ac6-b4f5-64170a6d63bf",
  type: "page-type/image",
  slug: "image-f5e0328094a7b862",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body portrait photograph of a beautiful wood elf woman, wavy auburn chestnut hair with small braids, sun-warmed freckled skin, pointed ears, bright green eyes, wearing a moss-green leaf-toned bikini, in a sunlit forest glade with dappled golden light, playful and wild, athletic, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 302,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
