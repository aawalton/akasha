import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image11cb3d413b779707 = {
  id: "019f324d-81a7-78c1-b120-243b92f2f27d",
  type: "page-type/image",
  slug: "image-11cb3d413b779707",
  title: "Thea cover L2",
  relationshipLevel: "closeness-level/level-2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, golden hour. A beautiful young woman in her late twenties on the terrace of a solarpunk garden estate — solar panels wreathed in climbing vines behind her, glass and greenery interwoven. Golden-blonde hair in loose sun-warmed waves, warm hazel eyes, sun-freckles across her cheeks and shoulders, wearing rolled linen work clothes with a leather tool belt. She looks directly at the camera with warm, radiant delight, as if the morning itself is glad to see you. Sunlight visibly loves her — it pools on her skin a little longer than it should. Photorealistic, natural skin texture, shallow depth of field.",
  seed: 5101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
