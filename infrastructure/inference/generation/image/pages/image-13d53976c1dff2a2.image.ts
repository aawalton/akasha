import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image13d53976c1dff2a2 = {
  id: "01a0c5f2-f92d-7fba-8f96-c5d7829de192",
  type: "page-type/image",
  slug: "image-13d53976c1dff2a2",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, Shared experiences: dates, travel, activities — the camera is *with* her. At the edge of a dawn lap pool, still turquoise water and crisp lane lines stretching out behind her, the low pale light catching faint steam off the surface; freshly out of the water with a towel draped loose around her shoulders over a simple athletic one-piece, auburn-chestnut hair damp and pushed back from her face, half-turned toward whoever's beside her with a bright open-mouthed laugh — caught mid-delight, sharing the cold-bright wonder of being up and out this early, water beading on bare shoulders. Shot on an 85mm portrait lens, under soft natural daylight. Photorealistic with natural skin detail, 1024x1024.",
  seed: 1975132371,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
