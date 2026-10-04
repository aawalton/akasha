import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2317221b1d732af9 = {
  id: "01a1067e-237d-7944-a7a6-34b202e1abdf",
  type: "page-type/image",
  slug: "image-2317221b1d732af9",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the dark timber and the character of the guild hall from the first image, but show it from outside: a great two-storey timber hall under a roof of weathered green copper on a busy cobbled square, its big doors standing open with warm light and bustle inside, adventurers with packs, swords and scuffed boots going up and down its wooden steps. The pink-haired woman from the second image stands small at the bottom of the steps, seen from behind and to the side, holding her satchel strap in both hands, looking up at the open doors, taking a deep breath, nervous but resolved. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel across her chest. Bright late-morning sun. Wide shot from across the square, 28mm lens, her face in three-quarter profile, nothing lettered.",
} as const satisfies Image
