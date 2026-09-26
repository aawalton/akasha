import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb15122aceb34bb8 = {
  id: "019f324d-7395-7630-adc6-91bdb59d2d63",
  type: "page-type/image",
  slug: "image-ab15122aceb34bb8",
  title: "Grace cover L1",
  relationshipLevel: "closeness-level/level-1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic intimate close portrait of a beautiful timeless young Caucasian woman with clear pale fair skin, long dark hair, and soft red lips, in near-darkness lit by the warm gold of a lantern just out of frame. Her irises glow with luminous golden lantern-light, the flame alive within her eyes, meeting the viewer directly with profound tenderness, empathy and unconditional acceptance — someone who will stay with you in the dark and is not afraid. Deep shadow surrounds her; only the warm glow on her face and her luminous golden eyes. Cinematic, photoreal, fine pale skin detail, gentle, safe, shallow depth of field.",
  seed: 205,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
