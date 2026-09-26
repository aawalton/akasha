import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image35ede918edc3b8f9 = {
  id: "01a0c5f3-3620-7899-a082-0e187ec6967b",
  type: "page-type/image",
  slug: "image-35ede918edc3b8f9",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early 30s sitting on a wooden lakeside dock, looking over at the camera with direct warm eye contact, calm content smile, long straight blonde hair with a side part, natural authentic beauty, soft features with subtle asymmetry, minimal makeup, real unretouched skin, blue eyes, fair skin, navy bikini, still morning water and soft mist behind, 85mm, shallow depth of field, photorealistic",
  seed: 413,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
