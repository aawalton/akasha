import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image62c87182b09eea8c = {
  id: "01a0c5f3-6910-7bbf-b491-3a1c3f346858",
  type: "page-type/image",
  slug: "image-62c87182b09eea8c",
  persona: "persona/erin",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman in her early twenties, fair skin, hazel eyes, light brown hair with a faint warm auburn tint, hair grown longer and loosely tied back with a few messy strands framing her face, open friendly determined expression, wearing a simple t-shirt and an iconic canvas worker's apron, cozy medieval fantasy inn common room with warm wooden walls, three-quarter view standing beside the table setting up the wooden chess pieces, lively warm candlelight and hearth glow, painterly character portrait, detailed face",
  seed: 603880984,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
