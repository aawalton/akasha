import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9a789477365a3220 = {
  id: "01a0c5f3-3621-7d0b-945c-671e08f52d2d",
  type: "page-type/image",
  slug: "image-9a789477365a3220",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A slim, fair-skinned young woman with a kpop idol face, clear magical sky-blue eyes, and a chin-length sky-blue bob with a side-swept fringe, photorealistic with natural skin detail. She stands relaxed on a city sidewalk in an oversized grey hoodie, hands in pockets, an easy half-smile, looking off to her left down the street. To her left a sunlit city street at golden hour recedes into warm bokeh, blurred signage and pedestrians, filling the open left of the frame. Photorealistic ultrawide 21:9 cinematic photograph, candid observed street-photography framing, warm golden-hour backlight, lens flare, shallow depth of field, high detail.",
  seed: 1250405459,
  width: 1680,
  height: 720,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
