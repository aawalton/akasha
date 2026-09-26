import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9551bd531a337746 = {
  id: "01a0c5f3-b3ca-70cc-99af-3ec905abcfb3",
  type: "page-type/image",
  slug: "image-9551bd531a337746",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic intimate close portrait of a young woman leaning gently close toward the viewer, warm loving eyes meeting yours with complete acceptance and tender closeness, a soft genuine heartfelt accepting smile, wearing a casual soft cotton tee, warm soft intimate lamplight, deeply safe present and real, you are received not judged, strong shallow depth of field with soft background blur, close framing",
  seed: 1772488937,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
