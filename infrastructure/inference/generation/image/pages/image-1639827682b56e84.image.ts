import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1639827682b56e84 = {
  id: "01a0c5f3-3620-753e-857a-e5e5a2a1b644",
  type: "page-type/image",
  slug: "image-1639827682b56e84",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "overhead photo taken from directly above a bed, a woman in her early twenties lying on her back, arms stretched above her head, long blonde hair spread over the pillow, looking up into the camera with direct warm eye contact, gentle content smile, natural authentic beauty, soft features with subtle asymmetry, minimal makeup, real unretouched skin, blue eyes, fair skin, wearing a blush-pink satin lingerie set, golden hour light falling across the bed in warm stripes, 35mm, photorealistic",
  seed: 443,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
