import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d9cd19eb2f6cd4a = {
  id: "019f1838-b8fb-7792-bc5c-62de5f0ac193",
  type: "page-type/image",
  slug: "image-2d9cd19eb2f6cd4a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "an 18-year-old human young woman, petite and short with a slender frame, a thin fine lovely face with delicate refined features, vivid bright red hair, natural soft warm blue eyes that look believably human and not glowing or oversaturated, fair skin lightly sun-warmed and faintly freckled, arms subtly toned from training, youthful and pretty with the upright poised bearing of a princess, wearing a deep wine-burgundy dress with gold trim and a modest high neckline and covered shoulders, over it a fine immaculate cream embroidered half-apron, sleeves pushed up, her red hair neatly tied back, a warm knowing capable look, the refined lady of the house, warm hearth glow, inside a warm wooden medieval fantasy inn, hearth firelight, close upper-body portrait, painterly character portrait, richly detailed, sharp focus on her eyes, warm cinematic lighting",
  seed: 41110011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
