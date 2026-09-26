import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6ff0941a77806a96 = {
  id: "019f1838-daf7-76b2-953e-28ef048ef574",
  type: "page-type/image",
  slug: "image-6ff0941a77806a96",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the entire image exactly as in the reference — identical woman, face, skin tone, eyes, hair, her exact pose, both bare shoulders with both thin straps down, the deep purple silk slip, the continuous deep purple satin foreground, the candlelight, the warm lamp, the framing, and the mood. Do not change her, her pose, her shoulders, the purple foreground, or the candlelight in any way.\n\nChange ONLY ONE thing: in the stack of satin jewel-tone pillows beside her, restore the EMERALD-GREEN satin pillow in the middle of the stack — so the stack reads sapphire-blue satin on top, emerald-green satin in the middle, and ruby-red satin on the bottom. Keep the existing sapphire and ruby pillows exactly as they are; simply add the missing emerald-green satin pillow between them, with matching satin sheen and warm candlelight. Do not recolor anything else.\n\nFRAME: Vertical portrait orientation, 2:3 aspect ratio. One subject only — her. Photorealistic, warm candlelight.",
  inputImage: "image/image-46e6d9e577fbb0b4",
} as const satisfies Image
