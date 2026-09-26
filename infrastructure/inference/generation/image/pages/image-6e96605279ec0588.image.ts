import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6e96605279ec0588 = {
  id: "01a0c5f3-3620-7782-bf3f-2d594e66c1e6",
  type: "page-type/image",
  slug: "image-6e96605279ec0588",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up outdoor portrait of a woman in her early 30s sitting on a wooden lakeside dock, body angled 45 degrees from the camera, face turned back toward the lens, direct warm eye contact, calm content smile, long straight blonde hair with a side part, natural authentic beauty, soft features with subtle asymmetry, minimal makeup, real unretouched skin, blue eyes, fair skin, soft blue summer sundress with thin straps and bare shoulders, still water and morning light behind, 85mm, photorealistic",
  seed: 404,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
