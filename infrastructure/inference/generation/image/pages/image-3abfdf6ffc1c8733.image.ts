import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3abfdf6ffc1c8733 = {
  id: "01a00fd3-b160-7b69-9fde-ad84f7bd232f",
  type: "page-type/image",
  slug: "image-3abfdf6ffc1c8733",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Stunning tall West African woman standing in a doorway of a mudbrick house at sunset, indigo-dyed gauze wrapper glowing translucent in the backlight, heavy gold hoops and stacked bangles, one hand raised against the door frame, direct calm gaze, warm dust hanging in the air behind her, painterly realism, indigo and amber\n",
  seed: 2129979150,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
