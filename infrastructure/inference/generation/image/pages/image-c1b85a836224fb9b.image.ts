import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC1b85a836224fb9b = {
  id: "01a10708-4071-777a-bb4e-5a3531ee2280",
  type: "page-type/image",
  slug: "image-c1b85a836224fb9b",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is in the narrow bed. The pink-haired woman from the second image lies on her back in the dark with the blanket pulled up and one hand flat on her chest, smiling up at the sloped ceiling. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a plain white linen shift. Night darkness, faint warm glow of the lit canal lanterns through the open round window. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
