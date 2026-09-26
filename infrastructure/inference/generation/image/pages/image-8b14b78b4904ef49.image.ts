import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8b14b78b4904ef49 = {
  id: "01a0c5f3-f003-7013-b1b2-893a021c5535",
  type: "page-type/image",
  slug: "image-8b14b78b4904ef49",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Sharpen this image so the focus is consistent across the whole frame. Keep everything exactly as it is — same woman, same pose, same composition, same lighting, same colors — only increase sharpness and fine detail uniformly, removing the soft out-of-focus patches. Photorealistic clarity throughout.",
  inputImage: "image/image-e121e2a8dda9be42",
} as const satisfies Image
