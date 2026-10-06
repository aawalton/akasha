import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBf2cb9aaed469744 = {
  id: "01a11374-b506-70ef-a5b0-9991cf1bb4fc",
  type: "page-type/image",
  slug: "image-bf2cb9aaed469744",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e6523dfa77c4852c",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear. On her pink hair sits a crown of fresh green birch leaves bound on a willow hoop, fitted carefully round the flower clip, with long blue ribbons trailing down behind. She wears a cropped cream halter top laced up the front, bare shoulders, a short sage-green skirt, a brown leather belt with pouches, tall brown boots, and a small leather satchel at her hip. She stands at a waterfront fair stall, reaching up with one hand to touch the leaves of her crown, beaming with delight, looking up and to the side. Behind her, striped stall awnings, ribbons strung between lamp posts, and the bright blue lake beyond. Bright summer morning sun. Medium shot from the waist up, 85mm lens, shallow depth of field.",
} as const satisfies Image
