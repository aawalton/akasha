import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFa1d3d43a6bb5368 = {
  id: "01a10746-1c04-7de0-bba9-a24cddd3c9ae",
  type: "page-type/image",
  slug: "image-fa1d3d43a6bb5368",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest. She wears a clean cropped cream halter top laced up the front and tied in a neat bow, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. She stands in a small sloped attic room by a round window, both hands raised to pin the pink-and-white flower clip above her ear, frowning a little in concentration at a small piece of mirror propped on the sill, her hair brushed until it shines. A wooden crate of potted plants, a fern, a little lemon tree, an aloe and a mint, stands beside her with a small watering jug. Soft grey-gold early morning light through the round window. Nothing lettered. Medium shot, 50mm lens, shallow depth of field.",
} as const satisfies Image
