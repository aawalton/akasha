import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEa8ff3f5010e37f6 = {
  id: "01a0c5f2-eb23-7fb9-a15a-07d863c08479",
  type: "page-type/image",
  slug: "image-ea8ff3f5010e37f6",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a loose oversized top and black tights, leaning against a bright window, one hand in her hair, calm soft gaze toward the viewer, warm morning light, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
