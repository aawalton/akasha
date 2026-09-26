import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1658ff867cbfc390 = {
  id: "019f1839-11a4-7dbe-8e21-29a303b81f0b",
  type: "page-type/image",
  slug: "image-1658ff867cbfc390",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "perfectly symmetric centered studio portrait of a serene idealized young woman, ambiguously South-Asian-rooted features, warm golden-brown skin, dark lustrous hair in a sleek modern minimal style, flawless golden-ratio facial proportions, beautiful to the point of being faintly uncanny, bilaterally symmetric composition, abstract sacred geometry of interlocking triangles and golden spirals rendered as clean luminous thin line-light glowing behind her, modern minimalist high-fashion editorial, luminous serene untouchable, NO bindi, NO nose ring, NO bridal jewelry, NO sari, NO henna, NO ethnic ornament, deep indigo and violet palette, cosmic night-sky of pure abstract thought, dark luminous background",
  seed: 1008260249,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
