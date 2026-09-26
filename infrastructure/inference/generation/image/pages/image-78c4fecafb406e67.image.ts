import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image78c4fecafb406e67 = {
  id: "01a0c5f3-b3c8-7958-8db6-a1e4db8425ed",
  type: "page-type/image",
  slug: "image-78c4fecafb406e67",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Kansas personified as a beautiful young woman in her early twenties — wheat-blonde hair loose in the wind, simple sky-blue dress, standing in a field of giant sunflowers with golden wheat and a dramatic prairie thunderhead far behind, luminous plains light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1543290839,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
