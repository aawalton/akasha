import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEe41e3b575e232cc = {
  id: "01a0c5f3-b3c8-7746-94b7-59294cb1189e",
  type: "page-type/image",
  slug: "image-ee41e3b575e232cc",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Maryland personified as a beautiful young woman in her early twenties — dark waves loose, sailing jacket in the black-gold-red-white of the Maryland flag, black-eyed susans in hand, Chesapeake Bay sailboats and a wooden pier behind her, breezy bright bay light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1081576373,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
