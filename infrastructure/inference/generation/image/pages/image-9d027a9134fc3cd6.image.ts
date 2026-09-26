import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9d027a9134fc3cd6 = {
  id: "01a0c5f3-b3ca-7e0e-822f-fdf4f3ae222a",
  type: "page-type/image",
  slug: "image-9d027a9134fc3cd6",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of an East Asian woman with silky black hair, soft gentle features, a soft serene genuine smile, tender warm gaze toward the viewer, soft morning garden light with greenery bokeh, wearing a soft pastel blouse, quiet and gentle and graceful, present and kind, shallow depth of field",
  seed: 570854503,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
