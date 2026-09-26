import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDd318527f4a8528b = {
  id: "019f1839-3a41-7627-9870-857ea60b1ae5",
  type: "page-type/image",
  slug: "image-dd318527f4a8528b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Close portrait of a young solarpunk princess engineer at her forge-bench, looking up from her work with a bright maker's gleam sparkling in her eyes. Delicate cream lace princess dress with gilded mechanical filigree, a leather apron over it, a wisp of hair loose at her temple. Warm sunlight through a glass-and-vine workshop, brass gears and blooming plants around her. Tender, alive, luminous, painterly, highly detailed face.",
  seed: 4303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
