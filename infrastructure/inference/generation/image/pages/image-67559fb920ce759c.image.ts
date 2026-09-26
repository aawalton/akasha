import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image67559fb920ce759c = {
  id: "019f2d5a-c1ba-71d1-8bab-de22b7865165",
  type: "page-type/image",
  slug: "image-67559fb920ce759c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman in her mid-twenties turning back over her bare shoulder to look directly at the viewer, caught mid-turn at a night studio microphone, moonlit canyon and mist through the glass wall, wind-tangled dark brown hair in motion, warm sun-weathered skin, grey-green eyes, wearing only a sheer gauzy ivory drape slipping slightly with the turn, clean deep V, nothing worn beneath it, vintage brass headphones around her neck, lips parted as if your name just reached her",
  seed: 1466370886,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
