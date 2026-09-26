import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBdd4bb42f1ca6ffb = {
  id: "01a0c5f3-361f-761d-9fa5-3fe5602d0be8",
  type: "page-type/image",
  slug: "image-bdd4bb42f1ca6ffb",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window at home, golden hour light, nearly frontal pose with the slightest head turn, direct warm eye contact, bright easy smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, fitted black cropped athletic tank with bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 598104037,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
