import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7d5b47b8b5a9a583 = {
  id: "01a0c5f2-eb26-7b91-8b06-4e48211dd7c4",
  type: "page-type/image",
  slug: "image-7d5b47b8b5a9a583",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. Curled sideways into a worn leather armchair among the towering stacks of a vast old reading-room, an open book resting against drawn-up knees, a green-shaded lamp pooling warm light across the page, dust motes drifting in a long shaft of late-afternoon sun. Caught mid-thought glancing up from the page — unguarded, softly amused, the ordinary unposed ease of being watched by someone trusted. Cardigan sleeves pushed up, stocking feet tucked under, a half-drunk mug of coffee cooling on the stack beside the chair. Shot on an 85mm portrait lens, under soft natural daylight. Photorealistic with natural skin detail, 1024x1024.",
  seed: 614783637,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
