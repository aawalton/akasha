import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2bd1e07c72d86906 = {
  id: "01a0c5f3-2541-7240-8188-356a098e5736",
  type: "page-type/image",
  slug: "image-2bd1e07c72d86906",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a slim Celtic woman standing among cream meadowsweet flowers in a summer meadow, blazing red wavy hair, green eyes, fair freckled skin, serene warm smile, looking at the camera, wearing an ornate moss-green Gaelic gown with gold Celtic knot embroidery, plunging neckline, long trailing hem, long fitted sleeves, soft warm afternoon sunlight, 35mm full length, photorealistic",
  seed: 716,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
