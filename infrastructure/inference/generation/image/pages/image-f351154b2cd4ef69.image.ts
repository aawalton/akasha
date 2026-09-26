import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF351154b2cd4ef69 = {
  id: "01a0c5f3-8d0b-7f86-ac47-b3d5f9cd70af",
  type: "page-type/image",
  slug: "image-f351154b2cd4ef69",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with fair skin, soft dark brown hair loose, gentle hazel eyes meeting the camera with quiet steady tenderness, lips softly parted in an unguarded almost-smile, leaning very close in warm candlelight, a soft silk slip drifting off one shoulder suggesting rather than revealing, bare shoulder, warm amber glow enveloping the scene, shallow depth of field, very close intimate framing, hands resting softly out of frame, safe warm sensual tender mood, natural soft skin texture, photographic, 50mm",
  seed: 488120,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
