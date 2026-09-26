import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5c66108299b13d88 = {
  id: "01a0c5f3-8d0e-7609-ac4f-e0580040e837",
  type: "page-type/image",
  slug: "image-5c66108299b13d88",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman in her early twenties in a dragon's hoard cave, warm firelight on mountains of gold coins, wearing a thin bronze silk wrap and layered gold chains slipping off one shoulder, barefoot, sitting on the coins with her legs tucked to one side, glancing up at the viewer with a mischievous grin, enormous scaled shape sleeping in the shadows behind, painterly fantasy realism, gold and ember\n",
  seed: 1096225128,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
