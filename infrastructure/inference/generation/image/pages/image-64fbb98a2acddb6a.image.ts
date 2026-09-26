import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image64fbb98a2acddb6a = {
  id: "01a0c5f3-3621-7b62-8c7f-fb44376becb4",
  type: "page-type/image",
  slug: "image-64fbb98a2acddb6a",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a petite slim young woman leaning against a graffiti street wall, slight feminine athletic build, flat chest, short sky-blue hair with a soft undercut, sky-blue eyes, fair skin, quick confident grin, direct eye contact, oversized white hoodie and tiny denim short shorts, bare legs, sneakers, golden hour street light, 35mm full length, photorealistic",
  seed: 614,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
