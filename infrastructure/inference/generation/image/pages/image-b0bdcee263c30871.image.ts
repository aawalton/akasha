import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB0bdcee263c30871 = {
  id: "01a106de-ce99-78a8-8f4b-60663d3a1bf5",
  type: "page-type/image",
  slug: "image-b0bdcee263c30871",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Move the scene outside the timber guild hall of the first image to a stone canal-side walk beside its steps at night, round paper lanterns newly lit along the canal, glowing amber and rose, reflected in the black water, the canal curving away to a bend. Keep both women's faces exactly as in their images. The tall black-haired woman from the second image walks away along the canal under the lanterns, straight-backed, a black ledger held against her side, glancing back over her shoulder just once with a quiet, softened look on her cool face. In the near foreground the pink-haired woman from the third image sits on the bottom step, watching her go with a warm, hopeful smile, one gloved hand half raised in farewell. The second image's woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned delicate oval face, cool grey eyes under straight dark brows, small straight nose, soft full lips, flawless pale porcelain skin, glossy black hair scraped smoothly back into a severe low bun at the nape; slim build, small chest; a long charcoal grey guild coat buttoned to the throat, slim dark trousers, black boots. The third image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, fingerless leather gloves, tall boots. Only these two women in the frame. Night, warm lantern glow. Wide shot, 35mm lens, both faces visible, deep depth of field.",
} as const satisfies Image
