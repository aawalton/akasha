import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA1a51f143fac7645 = {
  id: "01a1076b-b2de-7aac-9081-e7e6eeeef771",
  type: "page-type/image",
  slug: "image-a1a51f143fac7645",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest. She wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves, tall brown boots and a small leather healer's satchel at her hip. She walks over a little stone footbridge above a canal in thick white morning mist, smiling to herself, eyes on the mist ahead, one hand on the satchel strap. The water has vanished under the mist and the bridges rise out of it, the far bank only soft shapes, paper lanterns hanging unlit along the towpath, beaded with wet. Cool soft white early morning light. Nothing lettered. Medium full shot, 35mm lens, shallow depth of field.",
} as const satisfies Image
