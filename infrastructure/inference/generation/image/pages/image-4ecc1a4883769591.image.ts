import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4ecc1a4883769591 = {
  id: "01a10745-6f0c-7f31-a153-c9a3ccd2faa7",
  type: "page-type/image",
  slug: "image-4ecc1a4883769591",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest. She wears a plain white linen shift to the knee with thin straps, bare arms, and she is barefoot on the flagstones. She stands in a hot busy bakery before dawn, in front of a wooden bread rack in the corner, lifting the corner of a white cloth off a round golden honey cake between her finger and thumb, her other hand pressed to her chest, her lips parted and her eyes fixed on the cake, breath held. Behind her the bread ovens glow orange and the first trays of loaves cool on the racks; the shop window is still dark. Warm golden oven light on her face and shoulders, flour in the air. Nothing lettered. Medium shot from the side, 50mm lens, shallow depth of field, her face sharp.",
} as const satisfies Image
