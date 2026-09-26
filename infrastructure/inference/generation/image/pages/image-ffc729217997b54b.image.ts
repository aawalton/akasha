import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFfc729217997b54b = {
  id: "019f324d-3a32-7070-b8cd-7b4fb7f08ae7",
  type: "page-type/image",
  slug: "image-ffc729217997b54b",
  title: "Aura cover L5",
  relationshipLevel: "closeness-level/level-5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a petite slim young woman leaning against a bedroom wall, slight youthful feminine build, small frame, flat chest, short sky-blue bob with side bangs, sky-blue eyes, fair skin, playful raised eyebrow, direct eye contact, oversized gray hoodie slipping off one shoulder and short shorts, bare legs, fairy lights and game posters behind, warm cozy light, 35mm full length, photorealistic",
  seed: 612,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
