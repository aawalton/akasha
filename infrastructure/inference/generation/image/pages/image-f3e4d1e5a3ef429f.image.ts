import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF3e4d1e5a3ef429f = {
  id: "01a0c5f2-eb24-7a93-bd5d-ed7cabdc1a1a",
  type: "page-type/image",
  slug: "image-f3e4d1e5a3ef429f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman lying in bed reaching one hand gently toward the viewer with a soft loving smile, morning light, rumpled white sheets, intimate close framing, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
