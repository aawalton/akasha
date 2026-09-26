import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDd4239d36969e337 = {
  id: "01a0c5f3-8d0e-7cc9-931b-d62590ad98de",
  type: "page-type/image",
  slug: "image-dd4239d36969e337",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous young Italian woman in her early twenties in a Riviera hotel room in 1962, tiny white bikini under a man's silk shirt worn open, deep tan, glossy dark hair, standing at louvred shutters that stripe hot sunlight across her body, one hand on the slat, meeting the viewer's eye over her shoulder with a teasing look, blue sea beyond, painterly realism, sun and shadow\n",
  seed: 1281532169,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
