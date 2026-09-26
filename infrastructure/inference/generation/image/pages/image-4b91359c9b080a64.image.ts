import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b91359c9b080a64 = {
  id: "019f2dd2-4a80-71bd-a473-66fdf345ae24",
  type: "page-type/image",
  slug: "image-4b91359c9b080a64",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a slender young woman in her late twenties with Welsh features, long dark hair with deep emerald-green tones and an iridescent emerald-and-gold fall over one shoulder, pale green-grey eyes with round pupils, slender swept-back WHITE OPAL horns — milky with rose-green-gold fire flecks, an iridescent opal scale-glitter patch high on ONE cheek only, deep emerald-green halter-neck dress with the strap around her neck and bare shoulders. She stands in a grand collection gallery placing a small treasured artifact into an open glass display cabinet, glancing toward the viewer with a delighted knowing smile. Cabinets of curiosities, brass-labeled drawers, warm lamplight, open airy hall behind her.",
  seed: 7106,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
