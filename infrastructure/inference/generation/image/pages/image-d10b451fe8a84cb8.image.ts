import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD10b451fe8a84cb8 = {
  id: "01a0c5f3-b3cb-74ac-9fe9-05692dc8e80f",
  type: "page-type/image",
  slug: "image-d10b451fe8a84cb8",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman with a distinctive striking specific face, warm olive skin, strong elegant brows, a charming slightly crooked genuine grin showing real personality, dark wavy hair, deep brown eyes meeting yours with direct warm eye contact and delight that it is you, fresh sunlit greenhouse full of green plants, casual linen top, natural real skin texture with light imperfections, alive specific and real, shallow depth of field with soft bokeh, close framing",
  seed: 528063,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
