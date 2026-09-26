import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF4e9428280a1e87b = {
  id: "01a0c5f3-b3c9-7f60-a873-2b93d0a6e65c",
  type: "page-type/image",
  slug: "image-f4e9428280a1e87b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful Slavic woman inside a wooden winter cabin at night, thin white nightdress lit through from behind by the open door of a tiled stove, long blonde plait over one shoulder, bare feet on the boards, holding a shawl she has not put on, looking straight at the viewer with a soft dare, frost on the windows and blue snow-light outside, painterly realism, ember warmth\n",
  seed: 1355817310,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
