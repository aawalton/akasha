import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8d3c20162764c4b8 = {
  id: "019f2d55-aedf-7d35-ac91-465af9be47c9",
  type: "page-type/image",
  slug: "image-8d3c20162764c4b8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties caught in a candid alive moment at a studio microphone at night, weight shifted to one hip, shoulder dropped, head tilted with a spark of amusement, moonlit canyon mist through the window behind, tangled dark brown hair, warm weathered skin, grey-green eyes meeting the viewer directly, dressed only in a sheer gauzy ivory robe with a clean straight deep V to her navel, nothing under the sheer fabric, skin softly showing through, vintage brass headphones around her neck, lips parted mid-breath",
  seed: 726908052,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
