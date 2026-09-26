import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image42f3632f6175d8c8 = {
  id: "019f2d64-4cbf-7c30-9f30-5b918fa18025",
  type: "page-type/image",
  slug: "image-42f3632f6175d8c8",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Remove the second moon in the upper-left of the frame — there must be only ONE moon in the sky: the full moon in the upper-right behind the woman, exactly as it is. Where the upper-left moon was, continue the natural night sky with the same deep blue gradient and faint stars. Change absolutely nothing else — the woman (match her face exactly to the reference image), the microphone, the gorge, the river, the mist, the railing, the lamp, and the right-side moon all stay identical.",
  inputImage: "image/image-c1547816a1bca125",
  referenceImages: ["image/image-b76ab03f19af0c86"],
} as const satisfies Image
