import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDaccd2aebc0ed363 = {
  id: "01a0c5f3-7a9c-72c9-939f-30e605377af0",
  type: "page-type/image",
  slug: "image-daccd2aebc0ed363",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman in her early twenties wearing a sheer white silk wrap that has come undone and gold body chains beneath it, hair pinned up with tendrils loose, standing in the steam of a marble elven bathhouse with mosaic pools behind her, one hand holding the wrap loosely closed at her hip, glancing back at the viewer with a teasing look, warm shafts of light through pierced screens, painterly fantasy realism\n",
  seed: 1501646494,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
