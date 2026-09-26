import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6abe75434095ec1a = {
  id: "01a0c5f3-f003-754d-91aa-97c6fce25a02",
  type: "page-type/image",
  slug: "image-6abe75434095ec1a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, golden hour. A beautiful young woman in her late twenties on the terrace of a solarpunk garden estate — solar panels wreathed in climbing vines behind her, glass and greenery interwoven. Golden-blonde hair in loose sun-warmed waves, warm hazel eyes, sun-freckles across her cheeks and shoulders with a few of them glowing faintly gold like tiny embers under the skin, wearing rolled linen work clothes with a leather tool belt. Loose strands at the edges of her hair glow as if backlit with no backlight, tiny golden motes drifting off her waves like dust in a sunbeam that follows her. She looks directly at the camera with warm, radiant delight, as if the morning itself is glad to see you. Sunlight visibly loves her — it pools on her skin a little longer than it should. Photorealistic, natural skin texture, shallow depth of field.",
  seed: 5101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
