import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE2de387a28486cee = {
  id: "01a0c5f3-3620-73b7-b409-c0569a165828",
  type: "page-type/image",
  slug: "image-e2de387a28486cee",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up outdoor portrait of a woman in her early 30s on a wooden porch in the evening, leaning lightly on the railing, body angled 45 degrees from the camera, face turned back toward the lens, direct warm eye contact, quiet warm smile, long straight blonde hair with a side part, naturally pretty girl-next-door face, soft features with subtle asymmetry, minimal makeup, natural skin texture, blue eyes, fair skin, pale yellow summer sundress with thin straps and bare shoulders, warm string lights and dusk sky in bokeh, 85mm, photorealistic",
  seed: 406,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
