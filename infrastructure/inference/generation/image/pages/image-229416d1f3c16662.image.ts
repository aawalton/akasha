import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image229416d1f3c16662 = {
  id: "01a0c5f3-361f-7547-b341-6d0d56e780d3",
  type: "page-type/image",
  slug: "image-229416d1f3c16662",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window, golden hour light, facing the camera almost directly with the slightest head turn, direct warm eye contact, gentle open smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, pale yellow summer sundress with thin straps and bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 605080269,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
