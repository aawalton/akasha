import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image24a398c2939bf627 = {
  id: "01a11401-53cc-7cce-92da-e206555ea29b",
  type: "page-type/image",
  slug: "image-24a398c2939bf627",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fd7cf9dd1f73a977",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Photorealistic photograph. Light olive skin, dark brown almond-shaped eyes, straight defined dark brows, an oval face, full lips, long jet black hair in a single braid falling over one shoulder. She wears an old faded oversized blue University of Florida sleep shirt, soft and worn, its hem at mid-thigh, her legs bare, barefoot, the print on the shirt faded to a blurred shapeless crest with no readable letters. She sits curled up on a made queen hotel bed with her knees drawn up, leaning to her left, her head tilted as if resting on a shoulder just out of frame, one arm raised high and waving with her whole arm, a wide happy grin, looking straight ahead toward a doorway. Behind her is a retro resort motel room at night, a second queen bed with folded clothes stacked by color at its foot, a lamp with a scarf draped over it giving a low warm amber glow, blackout curtains drawn. Camera: medium shot from across the room at seated eye level, 50mm lens, her whole figure from knees up filling the frame, shallow depth of field with the amber room soft behind her.",
} as const satisfies Image
