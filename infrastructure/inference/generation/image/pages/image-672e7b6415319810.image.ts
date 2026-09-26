import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image672e7b6415319810 = {
  id: "01a0c5f3-3620-71bb-bd5d-941806367b03",
  type: "page-type/image",
  slug: "image-672e7b6415319810",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties wading out of a calm lake, water at her thighs, wet blonde hair pushed back from her face, direct warm eye contact with the camera, easy genuine smile, natural authentic beauty, soft features with subtle asymmetry, minimal makeup, real unretouched skin with water droplets, blue eyes, fair skin, wearing only a drenched white t-shirt gone see-through and clinging, nothing underneath, soft morning light and still water behind, 85mm, photorealistic",
  seed: 432,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
