import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2e331ddb1e17a98d = {
  id: "01a0c5f3-9f6d-7048-888b-c998a13adc3f",
  type: "page-type/image",
  slug: "image-2e331ddb1e17a98d",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman outdoors on an open windswept clifftop meadow at golden hour, wind moving through her loose flowing hair, vast open sky and distant horizon behind her, but she stands close to the camera and turned toward you, warm bright eyes meeting yours, an expression of free exhilarated joy shared directly with you, simple flowing sundress, soft warm golden natural light, shallow depth of field keeping her sharp against the soft open background, natural realistic skin texture, a felt sense of freedom and aliveness, close framing",
  seed: 591077,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
