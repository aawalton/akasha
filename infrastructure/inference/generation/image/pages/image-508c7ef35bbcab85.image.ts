import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image508c7ef35bbcab85 = {
  id: "019f2dcc-9f01-7b2f-9fce-5e17049a8ff8",
  type: "page-type/image",
  slug: "image-508c7ef35bbcab85",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a slender young woman in her late twenties with Welsh features, warm chestnut-auburn hair with an iridescent opal-fire sheen glinting rose, green and gold, pale opal-grey eyes with round pupils, slender swept-back white opal horns milky with colored fire flecks, a faint scatter of iridescent opal scales high on her cheekbones. She sits at a catalog desk in a museum gallery of glass display cases, looking up at the viewer with a warm knowing smile, pen resting on an open handwritten catalog ledger. Deep emerald-green wrap dress. Warm lamplight, cabinets of curiosities in soft blur behind her.",
  seed: 7101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
