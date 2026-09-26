import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image568c3d4af14bcb71 = {
  id: "01a0c5f3-8d0e-7087-93bc-f10ec33df68d",
  type: "page-type/image",
  slug: "image-568c3d4af14bcb71",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Very attractive young woman in her early twenties in the back room of a 1920s speakeasy, sheer beaded flapper slip over a lace garter and dark stockings, raven bobbed hair, perched on the edge of a card table with legs crossed, holding a coupe glass, meeting the viewer's gaze with a slow smile, low amber lamplight and cigarette haze, painterly realism, decadent\n",
  seed: 1363543957,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
