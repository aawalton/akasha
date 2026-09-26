import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAc16dae2636f9025 = {
  id: "01a0c5f3-b3c9-7140-9568-261a96e6d2f6",
  type: "page-type/image",
  slug: "image-ac16dae2636f9025",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous woman in a 1965 convertible pulled over on a desert highway at dusk, sitting up on the seat back with bare legs over the door, silk headscarf and cat-eye sunglasses pushed up, gingham sundress bunched at the thigh, looking right at the camera, purple horizon and last orange light, kodachrome road-trip photography\n",
  seed: 1770768294,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
