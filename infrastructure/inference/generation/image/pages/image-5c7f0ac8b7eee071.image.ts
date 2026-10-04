import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5c7f0ac8b7eee071 = {
  id: "01a10681-757a-7386-bb79-c5f953266b8f",
  type: "page-type/image",
  slug: "image-5c7f0ac8b7eee071",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at the long registration desk with its open ledgers, inkpots and brass stamping press. Behind the desk sits a thin young East Asian man clerk with ink on his cuffs and three ledgers open, writing without looking up, bored. In front of the desk the pink-haired woman from the second image stands upright, chin raised, both hands holding her satchel strap, speaking clearly and bravely, a small determined set to her mouth, cheeks faintly pink. A short line of adventurers waits behind her. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots, a small leather satchel across her chest. Warm late-morning sunbeams through dusty air. Medium two-shot from the side of the desk, 50mm lens, both faces clear, nothing lettered.",
} as const satisfies Image
