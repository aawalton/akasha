import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE5c1f08e8730c46b = {
  id: "019f2dd1-7d8b-7989-880a-93e4892f107f",
  type: "page-type/image",
  slug: "image-e5c1f08e8730c46b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic half-figure portrait of a slender young woman in her late twenties with Welsh features, warm chestnut-auburn hair with an iridescent opal-fire sheen glinting rose, green and gold, pale opal-grey eyes with round pupils, slender swept-back white opal horns milky with colored fire flecks, a faint scatter of iridescent opal scales high on her cheekbones. She hugs a thick leather-bound catalog to her chest with both arms, looking directly at the viewer, soft proud smile. Forest-green velvet dress. A gallery of curiosity cabinets and warm lamps softly blurred behind her.",
  seed: 7104,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
