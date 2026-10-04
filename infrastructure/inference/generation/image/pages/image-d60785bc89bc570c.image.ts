import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD60785bc89bc570c = {
  id: "01a106d8-40c1-74c3-a288-9f2651e87149",
  type: "page-type/image",
  slug: "image-d60785bc89bc570c",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Move the scene outside the timber guild hall of the first image to its worn stone front steps at dusk, the big wooden doors behind now shut, paper lanterns glowing along a canal below. Keep both women's faces exactly as in their images. The tall black-haired woman from the second image stands very straight on the steps, buckling a leather strap around a closed black ledger and holding it against her coat, saying something formal and precise, her face cool and composed, her glance toward the shut doors. The pink-haired woman from the third image sits on a step below her, looking up at her attentively, hands around her knees. The second image's woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned delicate oval face, cool grey eyes under straight dark brows, small straight nose, soft full lips in a composed unsmiling line, flawless pale porcelain skin, glossy black hair scraped smoothly back into a severe low bun at the nape; slim build, small chest; a charcoal grey guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. The third image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. Only these two women up close. Blue dusk with warm lantern glow on their faces. Medium shot from the side, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
