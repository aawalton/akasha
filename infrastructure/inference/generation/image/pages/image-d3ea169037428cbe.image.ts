import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD3ea169037428cbe = {
  id: "01a0c5f3-3620-7627-860f-3764500e8589",
  type: "page-type/image",
  slug: "image-d3ea169037428cbe",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early 30s sitting at the edge of a pool with her feet in the water, looking at the camera with direct warm eye contact, easy genuine smile, long straight blonde hair with a side part, naturally pretty girl-next-door face, soft unsculpted features, light freckles, minimal makeup, natural skin texture, blue eyes, fair skin, white bikini, bright midday sun with sparkling water, 50mm, photorealistic",
  seed: 412,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
