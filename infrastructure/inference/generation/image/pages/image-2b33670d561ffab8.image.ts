import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2b33670d561ffab8 = {
  id: "01a03626-1c1d-7000-85ac-b7aafcaf89c1",
  type: "page-type/image",
  slug: "image-2b33670d561ffab8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a beautiful young woman, pale skin, one grey eye and one a flat mirror, dark hair in a blunt cut, delicate lovely features, slender willowy build, small breasts, narrow shoulders and narrow waist, fine-boned and delicate, graceful rather than voluptuous, angular fragments of mirror embedded across her shoulder and hip catching and throwing the light, each shard showing a different reflection, wearing an unfastened dark slip fallen to her elbows, standing turned away with the mirrored shards on her narrow bare back facing us, looking back over her shoulder, a cool curious amused expression, cold silver light, painterly character portrait, direct eye contact with the viewer, intensely detailed eyes, sharp focus on the eyes\n",
  seed: 636037798,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
