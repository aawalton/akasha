import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDc57e6f874d84f97 = {
  id: "01a0c5f2-eb25-7b34-8459-d11b56406c37",
  type: "page-type/image",
  slug: "image-dc57e6f874d84f97",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a matching lace bra and panty set leaning in the bathroom doorway, soft diffused light, damp hair, relaxed intimate gaze toward the viewer, 50mm, shallow depth of field, fine lace detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
