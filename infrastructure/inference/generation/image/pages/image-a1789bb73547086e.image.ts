import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA1789bb73547086e = {
  id: "01a0c5f3-9f6f-74f7-90ce-03f488ed759f",
  type: "page-type/image",
  slug: "image-a1789bb73547086e",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman suspended underwater in a flooded marble cathedral, a vast pale silk gown billowing slowly around her, hair drifting, eyes open and looking straight at the viewer, calm and graceful, blue-green light shafting down through submerged stained glass and caustics dancing over the columns, painterly fantasy realism, silent and gorgeous\n",
  seed: 233876663,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
