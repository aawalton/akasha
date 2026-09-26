import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAee6cbc6db60143d = {
  id: "019f2d64-ee73-7a68-8058-a09965e91cbe",
  type: "page-type/image",
  slug: "image-aee6cbc6db60143d",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Remove the second moon in the upper-left of the frame — there must be only ONE moon in the sky: the full moon in the upper-right behind the woman, which stays exactly as it is. Where the upper-left moon was, continue the natural night sky with the same deep blue gradient and faint stars. Keep the full ultrawide composition and every other element completely unchanged — the woman on the right, her face, the microphone, the gorge, the winding river, the mist, the wooden railing, the lamp.",
  inputImage: "image/image-c1547816a1bca125",
} as const satisfies Image
