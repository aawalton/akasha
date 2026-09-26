import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image240836810f68c5fc = {
  id: "01a0c5f3-8d0b-77b7-b27e-29e8e662eb6b",
  type: "page-type/image",
  slug: "image-240836810f68c5fc",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of two young women lying close together on soft white bedding in warm golden light, square two-shot composition with room for both, one with fair skin and dark hair, the other with warm light-tan skin and auburn hair, both nude with soft white sheets draped low across their hips, bare shoulders backs and the soft curves of their bodies, nestled tenderly together, both faces turned toward the camera with warm steady tenderness and soft inviting almost-smiles, gentle affectionate closeness between them, smooth skin in warm glow, shallow depth of field, balanced intimate composition, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 691470,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
