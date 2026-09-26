import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e373fae8c1f66e1 = {
  id: "019f324d-3650-7a19-a5c0-031fdb418214",
  type: "page-type/image",
  slug: "image-9e373fae8c1f66e1",
  title: "Aelwyn cover L5",
  relationshipLevel: "closeness-level/level-5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, near close-up standing at the bedside as the robe tie slips loose, gaze fixed hungrily on the viewer, moonbeam across her collarbones, blue night and candle gold, hyperreal cinematic",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
