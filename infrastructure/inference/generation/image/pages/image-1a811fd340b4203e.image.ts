import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a811fd340b4203e = {
  id: "01a0c5f3-8d0b-7cdd-97c1-3e28a3ea8ef0",
  type: "page-type/image",
  slug: "image-1a811fd340b4203e",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with warm fair skin, dark hair damp and tousled, soft green eyes meeting the camera with warm steady tenderness and a soft relaxed almost-smile, reclining close in a warm candlelit bath, bare shoulders and collarbone above soft water, warm amber glow, soft steam, shallow depth of field, very close intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 218460,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
