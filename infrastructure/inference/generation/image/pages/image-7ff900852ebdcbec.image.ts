import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ff900852ebdcbec = {
  id: "01a0c5f3-6910-77d0-a13f-b60dcb4d5a03",
  type: "page-type/image",
  slug: "image-7ff900852ebdcbec",
  persona: "persona/erin",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman in her early twenties, fair skin, hazel eyes, light brown hair with a faint warm auburn tint, hair grown longer and loosely tied back with a few messy strands framing her face, open friendly determined expression, wearing a simple t-shirt and an iconic canvas worker's apron, cozy medieval fantasy inn common room with warm wooden walls, close head-and-shoulders portrait looking warmly toward the viewer, soft natural daylight from an inn window, painterly character portrait, detailed expressive face",
  seed: 249904560,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
