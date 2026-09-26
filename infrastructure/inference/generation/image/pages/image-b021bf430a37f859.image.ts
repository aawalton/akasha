import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB021bf430a37f859 = {
  id: "01a0c5f3-7a9c-7ffe-aea3-466e319cd26f",
  type: "page-type/image",
  slug: "image-b021bf430a37f859",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Very attractive young woman in her early twenties wearing a tightly laced leather and brass corset, sheer chemise underneath, garters and dark stockings, sitting back on the chart table of an airship captain's cabin with her boots up and legs crossed, goggles pushed into her tousled chestnut hair, giving the viewer a bold grin, brass lamps and clouds racing past the windows, painterly steampunk realism\n",
  seed: 2012853393,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
