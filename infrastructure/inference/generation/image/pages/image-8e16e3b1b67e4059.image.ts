import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8e16e3b1b67e4059 = {
  id: "01a0c5f3-3620-783c-a551-dc75135f75c3",
  type: "page-type/image",
  slug: "image-8e16e3b1b67e4059",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up outdoor portrait of a woman in her early 30s standing in a wildflower meadow, head and shoulders turned 45 degrees from the camera, eyes back to the lens with direct warm contact, gentle open smile, long straight blonde hair with a side part, naturally pretty girl-next-door face, soft unsculpted features, light freckles, minimal makeup, natural skin texture, blue eyes, fair skin, white summer sundress with thin straps and bare shoulders, late afternoon sun, flowers in soft focus, 85mm, photorealistic",
  seed: 403,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
