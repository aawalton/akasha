import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE6da64e5e863ce04 = {
  id: "01a0c5f3-6910-7f22-a0f4-0aaae7001ce4",
  type: "page-type/image",
  slug: "image-e6da64e5e863ce04",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal portrait, a striking playful woman lit in vivid neon, synthwave magenta and cyan; glowing game-glyphs, dice and pixel-runes floating around her; a delighted mischievous grin, eyes catching the light; the joyful spirit of the game itself; retro-futuristic arcade glow, rich saturated color, painterly realism, feminine and warm, not robotic",
  seed: 285052571,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
