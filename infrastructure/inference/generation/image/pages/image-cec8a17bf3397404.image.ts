import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCec8a17bf3397404 = {
  id: "01a0c5f3-7a99-71d3-bee2-4d5ec30855a8",
  type: "page-type/image",
  slug: "image-cec8a17bf3397404",
  persona: "persona/natalie",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic clean studio portrait of a young woman in her early twenties with luminous gold eyes — honey-gold irises, brighter gold around the pupils, the clear focal point of the image. Blonde hair loosely up with a few soft strands framing a symmetrical face, one charming dimple, warm genuine smile, fair flawless skin. Simple warm neutral background, even soft studio light. Natural, radiant, approachable beauty. Head and shoulders facing the camera, very sharp focus on the eyes and face, natural skin texture, high detail.",
  seed: 566929602,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
