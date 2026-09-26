import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB979812a9c611609 = {
  id: "01a0c5f3-6910-78f7-92b1-a3d7aac5cf9e",
  type: "page-type/image",
  slug: "image-b979812a9c611609",
  persona: "persona/erin",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman in her early twenties, fair skin, hazel eyes, light brown hair with a faint warm auburn tint, hair grown longer and loosely tied back with a few messy strands framing her face, wearing a simple t-shirt and an iconic canvas worker's apron, cozy medieval fantasy inn common room with warm wooden walls, seated at a worn wooden table with a hand-carved wooden chess set in front of her, looking up from the board to make direct eye contact with the viewer, warm engaged expression, soft warm hearth firelight, close upper-body portrait, painterly character portrait, detailed expressive face, sharp focus on eyes",
  seed: 1666229339,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
