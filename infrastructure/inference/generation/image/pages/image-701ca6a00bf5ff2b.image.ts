import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image701ca6a00bf5ff2b = {
  id: "019f1839-01a3-7c04-b733-e785a1fd20f5",
  type: "page-type/image",
  slug: "image-701ca6a00bf5ff2b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic editorial portrait of two elegant young women with bare shoulders, one with deep auburn-red wavy hair and one with sleek black hair, sharing a calm intimate gaze, cool soft studio light against a dark muted background, sophisticated and connected, flawless luminous skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80150011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
