import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5b7f29c0fd252615 = {
  id: "01a0c5f3-9f6f-7646-9d4d-82f3016f28cf",
  type: "page-type/image",
  slug: "image-5b7f29c0fd252615",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous redheaded woman in a 1930s Manhattan penthouse at night, bias-cut ivory satin gown catching the light along every curve, standing at a floor-to-ceiling window with snow falling outside and the lit city beyond, martini in one hand, glancing back at the viewer with a wry smile, warm lamplight against cold blue glass, painterly art deco realism\n",
  seed: 1205051447,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
