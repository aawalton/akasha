import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC79f573242a142e6 = {
  id: "01a0c5f3-361f-77e4-82b3-687938708875",
  type: "page-type/image",
  slug: "image-c79f573242a142e6",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window, golden hour light, body angled 45 degrees from the camera, face turned back toward the lens, direct warm eye contact, gentle open smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, pale yellow summer sundress with thin straps and bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 717917424,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
