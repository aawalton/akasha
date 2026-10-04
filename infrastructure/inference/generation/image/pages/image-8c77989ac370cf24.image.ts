import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8c77989ac370cf24 = {
  id: "01a10655-b669-7661-b73e-ad772ef05fd0",
  type: "page-type/image",
  slug: "image-8c77989ac370cf24",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-fba84451f24bca40"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the timber and plaster of the first image, now a small bare tidy room off the guild hall: one wooden bench, a plain table, an unlit iron stove, a single window high in the wall. The black-haired woman from the third image has just risen from the bench and stands tall and straight, a black leather ledger held against her side, looking steadily and coolly at the pink-haired woman from the second image, who stands just inside the open doorway, a step away, looking up at her with shy wide-eyed curiosity, hands on her satchel strap. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots, small leather satchel across her chest. The black-haired woman: a gorgeous tall willowy young Japanese woman of twenty-four, fine-boned oval face, high cheekbones, cool grey eyes under straight dark brows, soft full lips set unsmiling, flawless pale porcelain skin, glossy black hair scraped back into a severe low bun; slim build, small chest; charcoal guild coat buttoned to the throat with a small silver pin, slim dark trousers, black boots. Pale light falling from the high window. Medium shot, 35mm lens, both faces clear.",
} as const satisfies Image
