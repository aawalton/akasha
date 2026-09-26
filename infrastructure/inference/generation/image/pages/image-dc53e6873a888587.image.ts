import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDc53e6873a888587 = {
  id: "01a0c5f3-b3c8-7f35-b018-a5b34e1e852d",
  type: "page-type/image",
  slug: "image-dc53e6873a888587",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic candid portrait of a beautiful young woman at the very moment she arrives to greet you, her face lighting up with genuine delight at seeing you specifically, warm bright eyes meeting yours, caught mid-motion just settling in close, intimate private cozy interior with warm lamplight, soft natural makeup, relaxed loose wavy hair, casual cozy oversized cardigan slipping off one shoulder, shallow depth of field with soft bokeh, soft warm cinematic lighting, natural realistic skin texture, a felt sense of closeness and being met, close intimate framing",
  seed: 778231,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
