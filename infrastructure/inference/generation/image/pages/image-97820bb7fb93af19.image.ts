import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image97820bb7fb93af19 = {
  id: "01a0c5f3-9f6b-7e7c-bb21-e393e2f4714f",
  type: "page-type/image",
  slug: "image-97820bb7fb93af19",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with warm olive skin, dark hair loose and a little tousled, soft brown eyes meeting the camera with quiet tenderness, lips softly parted in an unguarded almost-smile, leaning very close in warm low candlelight, a soft silk slip drifting off one shoulder suggesting rather than revealing, bare shoulder and collarbone, shallow depth of field, very close intimate framing, hands resting softly out of frame, safe warm sensual tender mood, natural soft skin texture, photographic, 50mm",
  seed: 437760,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
