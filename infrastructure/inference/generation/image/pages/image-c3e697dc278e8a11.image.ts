import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC3e697dc278e8a11 = {
  id: "019f2dd4-0b63-7e4f-b78c-72031816ac3e",
  type: "page-type/image",
  slug: "image-c3e697dc278e8a11",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a slender young woman in her late twenties with Welsh features, long dark hair with deep emerald-green tones and an iridescent emerald-and-gold fall over one shoulder, pale green-grey eyes with round pupils, slender swept-back WHITE OPAL horns — milky with rose-green-gold fire flecks, an iridescent opal scale-glitter patch high on ONE cheek only, deep emerald-green halter-neck dress with the strap around her neck and bare shoulders. She sits at a catalog desk in the open center of a grand collection hall, a handwritten ledger open before her, looking up at the viewer with calm warm delight, holding a small labeled specimen in one hand. Glass cases and curiosity cabinets in soft blur, warm lamplight.",
  seed: 7107,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
