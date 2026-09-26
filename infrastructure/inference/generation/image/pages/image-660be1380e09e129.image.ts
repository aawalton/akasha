import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image660be1380e09e129 = {
  id: "01a0c5f3-8d0e-77b0-b3e0-ee7f3de81596",
  type: "page-type/image",
  slug: "image-660be1380e09e129",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic breathtaking portrait of a stunningly beautiful young woman with long flowing wavy auburn-red hair, luminous radiant skin, large captivating warm eyes meeting the viewer with an intimate tender gaze, soft full lips with a gentle smile, deeply feminine and graceful, wearing an off-shoulder gathered blouse revealing bare shoulders and collarbone, glowing golden-hour sunlight, rare arresting beauty beyond the ordinary, 85mm, exquisite hyperreal natural skin detail, shallow depth of field",
  seed: 414332526,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
