import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image16e46caf2b51ac1e = {
  id: "01a0c5f3-8d0c-7163-8027-f2d564eba70a",
  type: "page-type/image",
  slug: "image-16e46caf2b51ac1e",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close portrait of a distinctive striking young woman with a specific memorable face, pale skin and dark freckles, deep red wavy hair, sitting close and turning to you with her face softening into delight that it is you, warm direct eye contact, a quiet wood cabin with firelight glow behind her, cozy oversized sweater, natural real skin texture with imperfections, the felt sense of being met, shallow depth of field with soft bokeh, intimate chest-up close framing, hands resting in her lap not reaching toward the camera",
  seed: 365218,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
