import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4aca7876aba5ca96 = {
  id: "019f1901-9999-7506-a01a-cf2025ae6b1c",
  type: "page-type/image",
  slug: "image-4aca7876aba5ca96",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic intimate close portrait of a beautiful timeless young woman in near-darkness, her face softly lit from below by the warm gold of a lantern she holds. She looks directly at the viewer with profound tenderness, empathy, and unconditional acceptance — the face of someone who will stay with you in the dark and is not afraid. Deep shadow surrounds her. Cinematic, photoreal, fine natural skin detail, gentle, safe, comforting, shallow depth of field.",
  seed: 203,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
