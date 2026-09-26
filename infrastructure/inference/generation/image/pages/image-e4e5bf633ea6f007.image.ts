import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE4e5bf633ea6f007 = {
  id: "01a0c5f3-8d0c-78eb-939c-b18bc14272e1",
  type: "page-type/image",
  slug: "image-e4e5bf633ea6f007",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman seated behind a chessboard mid-game, pieces in the foreground, queen held up, strategic gaze, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 781054103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
