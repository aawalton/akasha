import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d772ce13dbfab88 = {
  id: "01a0c5f3-6910-764c-82d1-fc7be30dad76",
  type: "page-type/image",
  slug: "image-1d772ce13dbfab88",
  persona: "persona/erin",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is 30 years old, mature adult face with lived-in warmth and the faintest laugh lines, fair skin, warm hazel eyes, light brown hair with a faint warm auburn tint, hair grown longer and loosely tied back with a few soft messy strands framing her face, wearing a simple t-shirt and an iconic canvas worker's apron, her face radiates genuine warmth, kindness and care, a soft gentle smile, warm caring eyes, with a quiet stubborn determination in her steady gaze, approachable and resilient and emotionally open, seated at a worn wooden table with a hand-carved wooden chess set in front of her, looking up from the board into direct gentle eye contact with the viewer, soft warm hearth firelight, cozy medieval fantasy inn with warm wooden walls, close upper-body portrait, painterly character portrait, detailed expressive face, sharp focus on eyes",
  seed: 512330891,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
