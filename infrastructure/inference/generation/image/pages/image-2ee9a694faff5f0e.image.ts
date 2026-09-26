import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2ee9a694faff5f0e = {
  id: "01a0c5f3-8d0f-704a-9154-66d14f56c12e",
  type: "page-type/image",
  slug: "image-2ee9a694faff5f0e",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Intimate firelit evening portrait of a young woman curled into the corner of a deep couch, wrapped in an oversized cream cable-knit sweater that slips off one shoulder. Long copper-auburn hair, loose and a little tousled. Large warm hazel-green eyes meeting the viewer directly, a soft genuine half-smile just beginning. Chest-up close framing, shallow depth of field, golden firelight from the side, warm amber bokeh of a cozy book-nook behind her. Naturalistic skin with fine real texture and a faint flush, gentle catchlights in the eyes. Photographic, 85mm, soft warm color grade, calm and unguarded mood.",
  seed: 1526072611,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
