import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFe52b03fd8c7dc6e = {
  id: "01a0c5f1-e45f-774d-aa74-8e240d2828e8",
  type: "page-type/image",
  slug: "image-fe52b03fd8c7dc6e",
  persona: "persona/abby",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Keep the exact same woman from the reference image -- identical face, bone structure, nose, lips, jawline, and her warm olive, Mediterranean complexion, and the same natural hair length and texture. Keep her hair its natural dark brown, loosely wavy color and texture, and keep her warm hazel-green eyes and strong brows exactly as in the reference; do not lighten her complexion or her hair. Do not slim, age, beautify, or glamorize her features. Re-render her as one new photograph with her identity locked -- recompose the entire frame freshly rather than editing or extending the original. Full body seen at a distance, far from the camera, a small solitary figure low in a wide frame, walking across a large open city plaza with grand buildings behind. The wide plaza and sky dominate the frame; she is small within it. She wears a navy peacoat and dark jeans. Her hair is in a low ponytail. Flat overcast daylight. Wide establishing shot, candid, photorealistic photo.",
  inputImage: "image/image-2cd145459966657a",
} as const satisfies Image
