import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD93f046df8a354f8 = {
  id: "01a107a4-0925-738d-a623-3aab17587e9a",
  type: "page-type/image",
  slug: "image-d93f046df8a354f8",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-18b50fdd9b3aa1db",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, small, petite young Japanese woman of twenty with a sweet J-pop idol's face: a small round doll-like face, big bright blue eyes, a tiny nose, soft pink lips, fair smooth skin with a smudge of soot on one cheek, and blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head, with a slim build and small chest. She wears a plain white bathing shift of thick opaque linen, wet, her brass goggles still pushed up on her damp hair. She sits on the second green-tiled step of a great warm bathhouse pool tiled all over in every shade of green, steaming softly, under a high coppery-gold dome with long shafts of light falling through the steam from a lantern at its top, the warm water up to her chin, her knees drawn up under the shift and her arms wrapped round them so only her head shows above the water, her face crimson, staring very carefully at the water in front of her nose. Nothing lettered. Close medium shot, 50mm lens, shallow depth of field.",
} as const satisfies Image
