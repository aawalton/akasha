import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image79f16bff90c64ca0 = {
  id: "01a1071e-c26d-7ad8-aac8-dfd461457ce2",
  type: "page-type/image",
  slug: "image-79f16bff90c64ca0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-bfcce933d8b9acf1",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is downstairs in the bakery under the attic, by the racks and the wooden counter. The pink-haired woman from the second image stands barefoot before a bread rack in the corner, her hands pressed together under her chin, lifting the corner of a white cloth off a round cake between her finger and thumb, eyes on it, breath held. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a plain white linen shift, bare arms, barefoot. Before dawn, the windows still dark, warm golden light and heat from the open bread ovens. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
