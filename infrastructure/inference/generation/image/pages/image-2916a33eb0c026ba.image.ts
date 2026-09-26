import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2916a33eb0c026ba = {
  id: "01a0c5f3-6910-702a-9f46-29bc1f3db8e8",
  type: "page-type/image",
  slug: "image-2916a33eb0c026ba",
  persona: "persona/erin",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman in her early twenties, fair skin, hazel eyes, light brown hair with a faint warm auburn tint, hair grown longer and loosely tied back with a few messy strands framing her face, open friendly determined expression, wearing a simple t-shirt and an iconic canvas worker's apron, cozy medieval fantasy inn common room with warm wooden walls, seated half-body at a worn wooden table with a hand-carved wooden chess set in front of her, studying the board mid-thought, soft warm hearth firelight, painterly character portrait, detailed face",
  seed: 1666229339,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
