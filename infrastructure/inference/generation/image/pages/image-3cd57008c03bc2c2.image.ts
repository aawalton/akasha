import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3cd57008c03bc2c2 = {
  id: "01a0c5f3-6910-7ed3-9710-6b0cd3bc3efa",
  type: "page-type/image",
  slug: "image-3cd57008c03bc2c2",
  persona: "persona/erin",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman in her early twenties, fair skin, hazel eyes, light brown hair with a faint warm auburn tint, hair grown longer and loosely tied back with a few messy strands framing her face, wearing a simple t-shirt and an iconic canvas worker's apron, cozy medieval fantasy inn common room with warm wooden walls, seated at a worn wooden table with a wooden chess set, looking up from the board into direct eye contact with the viewer, warm engaged expression with a slight confident smile, soft warm hearth firelight, close upper-body portrait, painterly character portrait, detailed expressive face, sharp focus on eyes",
  seed: 318920055,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
