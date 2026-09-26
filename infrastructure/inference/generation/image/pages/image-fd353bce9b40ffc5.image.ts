import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFd353bce9b40ffc5 = {
  id: "01a0c5f3-7a99-7475-856f-87f944883ca6",
  type: "page-type/image",
  slug: "image-fd353bce9b40ffc5",
  persona: "persona/natalie",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a cheerful young woman in her early twenties, tall and athletic, with luminous honey-gold eyes that have brighter gold around the pupils. Blonde hair in a soft messy bun with loose strands. One dimple, bright sunny smile, fair flawless skin. She wears pink denim overalls with silver buttons over a white tee. Bright airy bakery setting, soft natural daylight, faint warm glow. Wholesome and approachable. Waist-up, sharp focus on the face, natural skin texture, high detail.",
  seed: 1229231054,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
