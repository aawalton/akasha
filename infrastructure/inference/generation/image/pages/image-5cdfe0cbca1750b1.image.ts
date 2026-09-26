import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5cdfe0cbca1750b1 = {
  id: "019f28d4-ca3b-737a-bc5c-d1cc39db33cc",
  type: "page-type/image",
  slug: "image-5cdfe0cbca1750b1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite compact young woman in her mid-twenties slouched back against a rock face, arms loose, chin dipped, wearing a faint unimpressed smirk — deadpan, unbothered, quietly amused superiority. Long black hair loosely tied, strands across her face. Blind eyes: flat matte white irises, unlit, non-reflective, faint pupil shadow, no glow. Undyed linen wrap top, leather cord necklace. Soft overcast light, granite texture behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6504,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
