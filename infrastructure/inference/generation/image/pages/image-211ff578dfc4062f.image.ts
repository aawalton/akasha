import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image211ff578dfc4062f = {
  id: "01a0fe26-2115-7edc-af4e-7be2de5018ea",
  type: "page-type/image",
  slug: "image-211ff578dfc4062f",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-367a6ad39cc5a626",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. Smooth light skin, soft dark brown eyes, gentle straight dark brows, a small mouth, a soft oval face, long straight black hair with a soft straight fringe, here worn loose, falling down over both shoulders, no ponytail. She wears a soft oatmeal knitted cardigan buttoned over a plain top, a faint smudge of ink on her fingertips. She is sitting at a scrubbed wooden kitchen table, seen from the waist up, both hands resting on the table in front of her beside a small twist of folded white paper and a yellow mug with daisies on it. She is looking down at the table, shy, her cheeks a little pink, with a small closed-lipped smile. Behind her is a small warm student kitchen in an old stone house at night: a counter with a kettle and a toaster, a jar of pickle, cream painted cupboards, a dark window with the night outside. Light: warm yellow overhead kitchen light, cosy, late evening. Camera: medium close-up, 85mm lens, eye level, shallow depth of field, the kitchen softly blurred behind her, she fills the frame, nobody else in the picture.",
} as const satisfies Image
