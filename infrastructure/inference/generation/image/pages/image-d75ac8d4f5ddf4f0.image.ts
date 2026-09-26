import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD75ac8d4f5ddf4f0 = {
  id: "019f1839-37ee-71f2-8781-c2adb5e09bd3",
  type: "page-type/image",
  slug: "image-d75ac8d4f5ddf4f0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Chest-up portrait of a beautiful young princess who is also a mechanical engineer, high-fantasy solarpunk. She wears an ornate Lolita-style princess gown of cream lace layered with gleaming brass and gilded clockwork filigree, living green vines and tiny crystals woven through it. A bright spark of inspiration glints in her eyes, alive and gleaming, the look of someone who just saw how to build the thing. Warm golden sunlight, a workshop-garden of brass machines half-overgrown with flowers behind her. Soft warm palette of gold, brass, cream, and leaf-green. Painterly, luminous, highly detailed face.",
  seed: 4101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
