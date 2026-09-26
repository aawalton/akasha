import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4f884b1708385210 = {
  id: "01a0c5f3-3620-71d6-ba68-35be793ac394",
  type: "page-type/image",
  slug: "image-4f884b1708385210",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "overhead photo taken from directly above a bed, a woman in her early twenties lying on her back on rumpled white bedding, arms above her head, long blonde hair loose around her shoulders, looking up into the camera with direct warm eye contact, quiet warm smile, naturally pretty girl-next-door face, soft features, light freckles, minimal makeup, natural skin texture, blue eyes, fair skin, wearing an ivory silk lingerie set with delicate lace trim, soft diffuse afternoon light, 35mm, photorealistic",
  seed: 444,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
