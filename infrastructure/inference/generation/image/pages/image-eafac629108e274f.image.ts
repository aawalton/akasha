import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEafac629108e274f = {
  id: "01a0c5f3-2542-734b-ae04-f509fda14558",
  type: "page-type/image",
  slug: "image-eafac629108e274f",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "street photo of a woman in her early 30s walking a tree-lined city street in autumn, camel wool coat in quiet colors, blonde hair in a low ponytail, blue eyes, fair skin, easy confident stride, soft overcast light, 35mm three-quarter framing, photorealistic",
  seed: 1606716163,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
