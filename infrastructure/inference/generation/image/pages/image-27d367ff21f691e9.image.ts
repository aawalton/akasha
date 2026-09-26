import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image27d367ff21f691e9 = {
  id: "01a0c5f3-361f-7681-a48a-0e2797cd46f2",
  type: "page-type/image",
  slug: "image-27d367ff21f691e9",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window at home, golden hour light, body angled 45 degrees from the camera, face turned back toward the lens, direct warm eye contact, bright easy smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, fitted black cropped athletic tank with bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 109591652,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
