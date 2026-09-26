import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image454f074b71d3c8e5 = {
  id: "01a0c5f3-6910-7200-a56d-957f8efb1fa4",
  type: "page-type/image",
  slug: "image-454f074b71d3c8e5",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal portrait, a striking warm woman surrounded by a floating halo of translucent glowing interface panels, stat windows and quest notifications and level-up boxes orbiting her like luminous petals; the glowing UI is her aura, not her body; warm flesh skin, an inviting knowing smile; soft cyan and gold holographic light against deep dark, painterly photoreal, feminine and alive, never robotic",
  seed: 1573963598,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
