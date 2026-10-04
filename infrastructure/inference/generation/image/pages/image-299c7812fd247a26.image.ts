import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image299c7812fd247a26 = {
  id: "01a106ae-491a-7265-acf5-7598f62612a6",
  type: "page-type/image",
  slug: "image-299c7812fd247a26",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-fba84451f24bca40", "image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, by the low grey chalk slates in its dim corner. The black-haired woman from the second image stands very straight a step behind, speaking flatly with an even, cool, unreadable face, lifting a single closed black leather ledger an inch in one long pale hand as if to show it as evidence. In the foreground the pink-haired woman from the third image has turned around to look back at her over her shoulder, surprised and grateful, lips parted. The second image's woman, with her exact face: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned delicate oval face, cool grey eyes under straight dark brows, small straight nose, soft full lips in a composed unsmiling line, flawless pale porcelain skin, glossy black hair scraped smoothly back into a severe low bun at the nape; slim build, small chest; a charcoal guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. The third image's woman, with her exact face: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves. Only these two women in the frame. Warm late afternoon light from high windows. Medium shot, 50mm lens, the black-haired woman in focus, both faces visible, shallow depth of field.",
} as const satisfies Image
