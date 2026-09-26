import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image85850f4b6e5a8ccc = {
  id: "01a0c5f3-b3cb-739e-8fb7-eef15a27b448",
  type: "page-type/image",
  slug: "image-85850f4b6e5a8ccc",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a distinctive striking young woman with a specific memorable face, warm freckled skin, dark wavy hair, opening a door and her whole face lighting up with delight the moment she sees that it is you, warm direct eye contact, cozy warm home interior glowing behind her, casual soft sweater, natural real skin texture with imperfections, the felt click of being welcomed and met, shallow depth of field with soft bokeh, intimate close framing, one hand resting relaxed on the doorframe not reaching toward the camera",
  seed: 273846,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
