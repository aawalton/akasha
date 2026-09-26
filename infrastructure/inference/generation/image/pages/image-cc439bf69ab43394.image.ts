import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCc439bf69ab43394 = {
  id: "01a0c5f3-361f-75b4-80ce-9253137f11e9",
  type: "page-type/image",
  slug: "image-cc439bf69ab43394",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s leaning back relaxed against the couch cushions beside the viewer, an open book resting in her hands, head turned to look over at the camera with direct warm eye contact, relaxed content smile, long straight blonde hair with a side part, natural authentic beauty, soft features with subtle asymmetry, minimal makeup, real unretouched skin texture, blue eyes, fair skin, oversized dusty-rose silk t-shirt with a fluid drape, black yoga pants, soft evening light with a warm throw blanket nearby, 50mm, shallow depth of field, photorealistic",
  seed: 323,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
