import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB311ddb462b31d5d = {
  id: "01a0c5f3-f003-7655-829b-4345d5020563",
  type: "page-type/image",
  slug: "image-b311ddb462b31d5d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, golden hour. A beautiful young woman in her late twenties on the terrace of a solarpunk garden estate — solar panels wreathed in climbing vines behind her, glass and greenery interwoven. Golden-blonde hair in loose sun-warmed waves, warm hazel eyes flecked with molten gold and a thin sun-bright ring around each pupil, eyes slightly brighter than the scene can explain, sun-freckles across her cheeks and shoulders, wearing rolled linen work clothes with a leather tool belt. A soft golden rim-glow traces her cheekbones and shoulders, as if she stands in her own golden hour. She looks directly at the camera with warm, radiant delight, as if the morning itself is glad to see you. Sunlight visibly loves her — it pools on her skin a little longer than it should. Photorealistic, natural skin texture, shallow depth of field.",
  seed: 5101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
