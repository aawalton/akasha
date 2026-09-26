import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image80defc1ab3226189 = {
  id: "01a0c5f3-b3cb-7791-a67d-cce59da146cf",
  type: "page-type/image",
  slug: "image-80defc1ab3226189",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a distinctive striking young woman with a specific memorable warm face, soft Latina features, dark eyes meeting yours directly with deep warmth and acceptance, a gentle accepting smile that says you are safe and received, resting close in soft warm lamplight, slightly messy dark hair, natural real skin texture with imperfections, a profound feeling of closeness and being accepted not judged, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 884512,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
