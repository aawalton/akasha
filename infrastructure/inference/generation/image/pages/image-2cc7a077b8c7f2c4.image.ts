import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2cc7a077b8c7f2c4 = {
  id: "01a10696-abf4-70d7-aa5e-a214a7914af9",
  type: "page-type/image",
  slug: "image-2cc7a077b8c7f2c4",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera, exactly two women in the foreground, one with black hair and one with pink hair. Keep the place from the first image, the timber guild hall, by its party board of small black chalk slates. The tall black-haired woman from the second image stands one step behind and a little to one side of the pink-haired woman from the third image, steady as a wall, a closed black leather ledger under her arm, her cool grey eyes sweeping across the blurred adventurers in the hall, who all look away. The pink-haired woman stands in front of her with her hands at her sides, cheeks still flushed, looking down at the floor. The black-haired woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned oval face, high cheekbones, cool grey eyes under straight dark brows, soft full lips set unsmiling, flawless pale porcelain skin, glossy black hair scraped back into a severe low bun; slim build, small chest; charcoal guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. Warm afternoon light from high windows. Medium shot, 50mm lens, both faces clear, background soft.",
} as const satisfies Image
