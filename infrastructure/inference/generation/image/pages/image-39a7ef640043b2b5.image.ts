import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image39a7ef640043b2b5 = {
  id: "01a0c5f3-b3cb-757f-a6ca-42c29e75bf0c",
  type: "page-type/image",
  slug: "image-39a7ef640043b2b5",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman folk singer-songwriter, wavy auburn hair, light freckles across her nose, warm hazel eyes, soft natural features, gentle expression, singing into a vintage microphone on a small intimate stage, eyes closed mid-note, warm amber spotlight, dark bokeh audience behind, 85mm portrait, photoreal",
  seed: 466896179,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
