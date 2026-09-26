import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDe9dab3739e96544 = {
  id: "01a0c5f3-361f-79c3-80af-36cd9aada39a",
  type: "page-type/image",
  slug: "image-de9dab3739e96544",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s on a couch leaning an elbow on the back cushion with her head resting on her hand, body turned toward the viewer beside her, direct warm eye contact, gentle amused smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, oversized faded-navy t-shirt and black yoga pants, soft afternoon daylight, 50mm, shallow depth of field, photorealistic",
  seed: 203,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
