import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB2ebc9872c02fbd4 = {
  id: "01a0c5f3-f003-778f-9ea7-3591d321b1aa",
  type: "page-type/image",
  slug: "image-b2ebc9872c02fbd4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, golden hour. A beautiful young woman in her late twenties on the terrace of a solarpunk garden estate — solar panels wreathed in climbing vines behind her, glass and greenery interwoven. Golden-blonde hair in loose sun-warmed waves, warm hazel eyes flecked with molten gold and a thin sun-bright ring around each pupil, sun-freckles across her cheeks and shoulders with a few glowing faintly gold like tiny embers under the skin, wearing rolled linen work clothes with a leather tool belt. A soft golden rim-glow traces her cheekbones and shoulders, loose strands at the edges of her hair glowing as if backlit, and every flower on the terrace is turned toward her instead of the sun. She looks directly at the camera with warm, radiant delight, as if the morning itself is glad to see you. Sunlight visibly loves her — it pools on her skin a little longer than it should. Photorealistic, natural skin texture, shallow depth of field.",
  seed: 5101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
