import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image41d745af1a1601de = {
  id: "01a1064e-b8fd-706b-8d5c-420c0357c237",
  type: "page-type/image",
  slug: "image-41d745af1a1601de",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at its long registration desk with open ledgers and a brass stamping press. The pink-haired woman from the second image stands at the desk holding up a small copper tag between her fingers, turning it in the light and gazing at it with quiet wonder and a small trembling smile. A little stack of silver coins and a few copper coins sit on the desk beside her. Behind the desk a thin young East Asian clerk with ink on his cuffs rests his hand on the handle of the brass press. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. Warm early afternoon light slanting from high windows. Medium close shot from the side, 50mm lens, her face and the copper tag clear, shallow depth of field, nothing lettered.",
} as const satisfies Image
