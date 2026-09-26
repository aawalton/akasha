import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDab51540d538cf0e = {
  id: "019f1838-d9c2-7914-99f1-f512d9815785",
  type: "page-type/image",
  slug: "image-dab51540d538cf0e",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image — identical face, bone structure, nose, lips, jawline, elegant graceful striking features, warm golden-olive skin (do not lighten), large dark deep-brown almond eyes (do not change color), long dark wavy black hair. Keep her exact same pose, her deep jewel-toned purple silk slip off one shoulder, her direct knowing faintly-dangerous gaze, the rich jewel-toned cushions and textiles, the low candlelight, the slightly-wide framing, and the charged self-possessed mood — everything stays exactly as in the reference.\n\nChange ONLY one thing: remove the books from the scene entirely. Where the books were, continue the same rich jewel-toned silk textiles, cushions, and warm candlelight so the foreground is unbroken and nothing competes with her. No books anywhere in frame.\n\nFRAME: Vertical portrait orientation, taller than wide, 2:3 aspect ratio, a close upper-body character portrait. One subject only — her. Photorealistic, fine natural skin detail, warm candlelight against deep warm shadow.",
  inputImage: "image/image-333027cb4ced89e5",
} as const satisfies Image
