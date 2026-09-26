import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBbcf77da1a6286b6 = {
  id: "01a0c5f3-7a99-7f5c-aad6-e703cf64d0b2",
  type: "page-type/image",
  slug: "image-bbcf77da1a6286b6",
  persona: "persona/natalie",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a radiant young woman in her early twenties, tall and athletic. Her most striking feature is her luminous gold eyes — warm honey-gold irises with brighter gold around the pupils, clear and captivating. Blonde hair loosely gathered up in a soft ponytail with a few stray strands framing her face. A single charming dimple in a warm, genuine, sunny smile; fair flawless skin; softly symmetrical face. She wears a pastel blouse with a small rabbits-and-radishes print. Cozy sunlit kitchen behind her, warm golden-hour light. Wholesome, vivid, approachable. Head and shoulders, sharp focus on the face, natural skin texture, high detail.",
  seed: 121085617,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
