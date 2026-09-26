import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image65d34d3c5b3af64c = {
  id: "019f2d60-c575-7783-bd63-8f51205a6b12",
  type: "page-type/image",
  slug: "image-65d34d3c5b3af64c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties leaning back against the edge of a recording desk at night, palms braced on the desk behind her, chest open, chin slightly lowered, looking up directly into the camera with quiet knowing warmth, brass headphones around her neck, moonlit gorge and mist through the tall glass behind, wind-tangled dark brown hair, sun-weathered skin, wearing only a sheer whisper-thin ivory gown with a clean straight deep V to the navel, nothing worn beneath it",
  seed: 1832709717,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
