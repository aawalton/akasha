import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0394c18ff503ce2f = {
  id: "01a0c5f3-8d0e-7704-b290-87ec98a1472e",
  type: "page-type/image",
  slug: "image-0394c18ff503ce2f",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Exquisite young woman in her early twenties in a French chateau bedroom at sunrise, ivory silk corset with garters and sheer stockings, chestnut hair pinned loosely and falling, sitting on the edge of an enormous canopy bed with one leg extended, fastening a stocking clip while looking up at the viewer, soft pink dawn light through tall shutters, painterly realism, elegant and seductive\n",
  seed: 351100960,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
