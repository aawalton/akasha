import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA63df48a4dcb0612 = {
  id: "01a0fdfd-ec56-7b28-ac53-130996aa1543",
  type: "page-type/image",
  slug: "image-a63df48a4dcb0612",
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
    "Keep this exact woman: same face, skin and hair. Change the scene around her. Fantasy photorealistic, soft and quiet. She is a slim, delicate Chinese-British woman of twenty with narrow shoulders and a small flat chest, smooth light skin, soft dark brown eyes, gentle straight brows, a small mouth, and long straight black hair with a soft fringe, worn in a low ponytail over one shoulder. She wears a soft plain grey knit jumper, loose and cosy, with ink smudged on two fingertips. She is sitting on a long wooden bench at a refectory table, just settled, both forearms resting on the table, a plate of toast in front of her. There are faint tired shadows under her eyes, and she gives a small, shy, bleary smile, looking at the viewer from across the table from under her lashes. Behind her is a vast old stone dining hall with dark oak panelling, long tables, and tall arched windows full of bright late-morning sunshine, racks of toast and pots of marmalade down the table, blurred girls in hoodies in the background. Warm golden sunlight falls across her from the side, a Saturday morning in autumn. Framed from the top of her head to her waist, close vertical composition, eye level across the table, 85mm lens, shallow depth of field, she fills the frame, fine skin texture, gentle film grain.",
} as const satisfies Image
