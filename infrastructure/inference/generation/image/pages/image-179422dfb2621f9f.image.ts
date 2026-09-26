import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image179422dfb2621f9f = {
  id: "01a0c5f3-2541-7b2f-9875-6d6b27d1597e",
  type: "page-type/image",
  slug: "image-179422dfb2621f9f",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cinematic full-body photorealistic photo of a slim Celtic goddess on a green Irish hilltop at warm dusk, blazing red hair flowing in a soft breeze, bright green eyes, fair freckled skin, calm proud expression with direct eye contact, ornate forest-green Gaelic gown with gold Celtic embroidery, deep plunging neckline, long trailing hem, long sleeves, low golden sun behind, rim light, 35mm full length, photorealistic",
  seed: 713,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
