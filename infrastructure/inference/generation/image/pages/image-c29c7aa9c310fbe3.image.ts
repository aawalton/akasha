import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC29c7aa9c310fbe3 = {
  id: "019f1839-11aa-7547-b29e-073c2e3d6fc5",
  type: "page-type/image",
  slug: "image-c29c7aa9c310fbe3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "perfectly symmetric centered studio portrait of a serene idealized young woman, ambiguously South-Asian-rooted features, warm golden-brown skin, dark lustrous hair in a sleek modern minimal style, flawless golden-ratio facial proportions, beautiful to the point of being faintly uncanny, bilaterally symmetric composition, abstract sacred geometry of interlocking triangles and golden spirals rendered as clean luminous thin line-light glowing behind her, modern minimalist high-fashion editorial, luminous serene untouchable, NO bindi, NO nose ring, NO bridal jewelry, NO sari, NO henna, NO ethnic ornament, pale gold and warm white palette, radiant divine light, soft ivory background",
  seed: 197150398,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
