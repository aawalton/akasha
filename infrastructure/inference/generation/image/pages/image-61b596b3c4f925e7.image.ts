import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image61b596b3c4f925e7 = {
  id: "019f1838-daf7-74ac-94cc-1ac065412050",
  type: "page-type/image",
  slug: "image-61b596b3c4f925e7",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image — identical face, bone structure, nose, lips, jawline, elegant graceful striking features, warm golden-olive skin (do not lighten), large dark deep-brown almond eyes (do not change color), long dark wavy black hair. Keep her exact same pose, her deep jewel-toned purple silk slip off one shoulder, her direct knowing faintly-dangerous gaze, the cushions, the low candlelight and warm lamp glow, the slightly-wide framing, and the charged self-possessed mood — everything stays exactly as in the reference.\n\nChange ONLY one thing: the draped cloth in the lower foreground (currently a separate green/teal satin) should instead be the same deep purple satin bedsheet, matching her purple silk — so the foreground is one continuous sweep of rich purple satin with no competing green cloth. Keep the same folds, candlelight, and warmth; just change that cloth's color to the deep purple satin.\n\nFRAME: Vertical portrait orientation, taller than wide, 2:3 aspect ratio, a close upper-body character portrait. One subject only — her. Photorealistic, fine natural skin detail, warm candlelight against deep warm shadow.",
  inputImage: "image/image-14a2e7337e7ec7e6",
} as const satisfies Image
