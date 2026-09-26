import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE5ef2b502f4c3c07 = {
  id: "019f28c7-d6a2-7480-ab99-09305c3bd45b",
  type: "page-type/image",
  slug: "image-e5ef2b502f4c3c07",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close portrait photograph, head and shoulders, of a small sturdy young woman in her mid-twenties on mountain rock in early light, face nearly frontal, chin level. Black hair loosely gathered with escaped strands. Fully white blind eyes — pale marble irises with no visible pupil, softly catching the light, unfocused. Grave quiet beauty, serious and serene, ancient patience in a young face. Undyed linen wrap, bare shoulders, faint freckles, fine dust in the air, natural skin texture, 85mm lens, photoreal.",
  seed: 6311,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
