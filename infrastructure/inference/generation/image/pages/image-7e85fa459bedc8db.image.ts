import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7e85fa459bedc8db = {
  id: "01a107a5-ab66-7bbc-abe1-f831d357a36c",
  type: "page-type/image",
  slug: "image-7e85fa459bedc8db",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest; her pink hair is wet and dripping. She wears a big rough white towel wrapped round her body up under her arms, her shoulders and arms bare and pink from the heat, beaded with sweat. She sits on the slatted cedar bench of a small round steam room tiled in white, with a slatted wooden bench round the wall, thick white steam in the air, leaning back against the hot tiles with her eyes closed and a blissful smile, her head tipped a little to one side. Nothing lettered. Medium shot, 50mm lens, shallow depth of field.",
} as const satisfies Image
